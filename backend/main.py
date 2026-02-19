from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt

from database import get_db, create_tables
from schemas import (
    User, UserCreate, UserUpdate,
    Event, EventCreate, EventUpdate,
    Donation, DonationCreate, DonationUpdate,
    Content, ContentCreate, ContentUpdate,
    QuranAyah, QuranAyahCreate, QuranAyahUpdate,
    Token
)
import crud

# Initialize FastAPI app
app = FastAPI(
    title="Masjid Management API",
    description="Backend API for Mosque Management System",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

security = HTTPBearer()

# Create database tables
create_tables()

# Auth Functions
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return email

def get_current_user(email: str = Depends(verify_token), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Masjid Management API", "version": "1.0.0"}

# Auth endpoints
@app.post("/auth/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=email)
    if not user or not crud.verify_password(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user": user}

# User endpoints
@app.get("/users", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.post("/users", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = crud.update_user(db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    success = crud.delete_user(db, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

# Event endpoints
@app.get("/events", response_model=List[Event])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

@app.post("/events", response_model=Event)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db=db, event=event)

@app.get("/events/search")
def search_events(q: str, db: Session = Depends(get_db)):
    events = crud.search_events(db, query=q)
    return events

@app.get("/events/{event_id}", response_model=Event)
def read_event(event_id: int, db: Session = Depends(get_db)):
    db_event = crud.get_event(db, event_id=event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@app.put("/events/{event_id}", response_model=Event)
def update_event(event_id: int, event: EventUpdate, db: Session = Depends(get_db)):
    db_event = crud.update_event(db, event_id=event_id, event=event)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@app.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    success = crud.delete_event(db, event_id=event_id)
    if not success:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}

# Donation endpoints
@app.get("/donations", response_model=List[Donation])
def read_donations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    donations = crud.get_donations(db, skip=skip, limit=limit)
    return donations

@app.post("/donations", response_model=Donation)
def create_donation(donation: DonationCreate, db: Session = Depends(get_db)):
    return crud.create_donation(db=db, donation=donation)

@app.get("/donations/search")
def search_donations(q: str, db: Session = Depends(get_db)):
    donations = crud.search_donations(db, query=q)
    return donations

@app.get("/donations/{donation_id}", response_model=Donation)
def read_donation(donation_id: int, db: Session = Depends(get_db)):
    db_donation = crud.get_donation(db, donation_id=donation_id)
    if db_donation is None:
        raise HTTPException(status_code=404, detail="Donation not found")
    return db_donation

@app.put("/donations/{donation_id}", response_model=Donation)
def update_donation(donation_id: int, donation: DonationUpdate, db: Session = Depends(get_db)):
    db_donation = crud.update_donation(db, donation_id=donation_id, donation=donation)
    if db_donation is None:
        raise HTTPException(status_code=404, detail="Donation not found")
    return db_donation

@app.delete("/donations/{donation_id}")
def delete_donation(donation_id: int, db: Session = Depends(get_db)):
    success = crud.delete_donation(db, donation_id=donation_id)
    if not success:
        raise HTTPException(status_code=404, detail="Donation not found")
    return {"message": "Donation deleted successfully"}

# Content endpoints
@app.get("/content", response_model=List[Content])
def read_content(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    content = crud.get_contents(db, skip=skip, limit=limit)
    return content

@app.post("/content", response_model=Content)
def create_content(content: ContentCreate, db: Session = Depends(get_db)):
    return crud.create_content(db=db, content=content)

@app.get("/content/search")
def search_content(q: str, db: Session = Depends(get_db)):
    content = crud.search_content(db, query=q)
    return content

@app.get("/content/{content_id}", response_model=Content)
def read_content(content_id: int, db: Session = Depends(get_db)):
    db_content = crud.get_content(db, content_id=content_id)
    if db_content is None:
        raise HTTPException(status_code=404, detail="Content not found")
    return db_content

@app.put("/content/{content_id}", response_model=Content)
def update_content(content_id: int, content: ContentUpdate, db: Session = Depends(get_db)):
    db_content = crud.update_content(db, content_id=content_id, content=content)
    if db_content is None:
        raise HTTPException(status_code=404, detail="Content not found")
    return db_content

@app.delete("/content/{content_id}")
def delete_content(content_id: int, db: Session = Depends(get_db)):
    success = crud.delete_content(db, content_id=content_id)
    if not success:
        raise HTTPException(status_code=404, detail="Content not found")
    return {"message": "Content deleted successfully"}

# Quran Ayah endpoints
@app.get("/quran-ayahs", response_model=List[QuranAyah])
def read_quran_ayahs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ayahs = crud.get_quran_ayahs(db, skip=skip, limit=limit)
    return ayahs

@app.post("/quran-ayahs", response_model=QuranAyah)
def create_quran_ayah(ayah: QuranAyahCreate, db: Session = Depends(get_db)):
    return crud.create_quran_ayah(db=db, ayah=ayah)

@app.get("/quran-ayahs/search")
def search_quran_ayahs(q: str, db: Session = Depends(get_db)):
    ayahs = crud.search_quran_ayahs(db, query=q)
    return ayahs

@app.get("/quran-ayahs/surah/{surah_number}", response_model=List[QuranAyah])
def read_quran_ayahs_by_surah(surah_number: int, db: Session = Depends(get_db)):
    ayahs = crud.get_quran_ayahs_by_surah(db, surah_number=surah_number)
    return ayahs

@app.get("/quran-ayahs/{ayah_id}", response_model=QuranAyah)
def read_quran_ayah(ayah_id: int, db: Session = Depends(get_db)):
    db_ayah = crud.get_quran_ayah(db, ayah_id=ayah_id)
    if db_ayah is None:
        raise HTTPException(status_code=404, detail="Quran Ayah not found")
    return db_ayah

@app.put("/quran-ayahs/{ayah_id}", response_model=QuranAyah)
def update_quran_ayah(ayah_id: int, ayah: QuranAyahUpdate, db: Session = Depends(get_db)):
    db_ayah = crud.update_quran_ayah(db, ayah_id=ayah_id, ayah=ayah)
    if db_ayah is None:
        raise HTTPException(status_code=404, detail="Quran Ayah not found")
    return db_ayah

@app.delete("/quran-ayahs/{ayah_id}")
def delete_quran_ayah(ayah_id: int, db: Session = Depends(get_db)):
    success = crud.delete_quran_ayah(db, ayah_id=ayah_id)
    if not success:
        raise HTTPException(status_code=404, detail="Quran Ayah not found")
    return {"message": "Quran Ayah deleted successfully"}

# Statistics endpoint
@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    events = crud.get_events(db)
    donations = crud.get_donations(db)
    users = crud.get_users(db)
    
    total_events = len(events)
    upcoming_events = len([e for e in events if e.status == "upcoming"])
    
    total_donations = len(donations)
    completed_donations = [d for d in donations if d.status == "completed"]
    monthly_total = sum(d.amount for d in completed_donations 
                     if d.date.month == datetime.now().month 
                     and d.date.year == datetime.now().year)
    
    total_users = len(users)
    active_users = len([u for u in users if u.status == "active"])
    
    return {
        "events": {
            "total": total_events,
            "upcoming": upcoming_events
        },
        "donations": {
            "total": total_donations,
            "monthly_total": monthly_total
        },
        "users": {
            "total": total_users,
            "active": active_users
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
