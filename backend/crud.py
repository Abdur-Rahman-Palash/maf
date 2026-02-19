from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
import json
from datetime import datetime

from database import User, Event, Donation, Content, QuranAyah, Service, Media
from schemas import UserCreate, UserUpdate, EventCreate, EventUpdate, DonationCreate, DonationUpdate, ContentCreate, ContentUpdate, QuranAyahCreate, QuranAyahUpdate, ServiceCreate, ServiceUpdate, MediaCreate, MediaUpdate

# User CRUD
def get_user(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        phone=user.phone,
        address=user.address,
        role=user.role,
        status=user.status,
        skills=json.dumps(user.skills) if user.skills else None,
        notes=user.notes
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: UserUpdate) -> Optional[User]:
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        update_data = user.dict(exclude_unset=True)
        if 'skills' in update_data:
            update_data['skills'] = json.dumps(update_data['skills'])
        
        for field, value in update_data.items():
            setattr(db_user, field, value)
        
        db_user.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int) -> bool:
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False

# Event CRUD
def get_event(db: Session, event_id: int) -> Optional[Event]:
    return db.query(Event).filter(Event.id == event_id).first()

def get_events(db: Session, skip: int = 0, limit: int = 100) -> List[Event]:
    return db.query(Event).order_by(Event.date.desc()).offset(skip).limit(limit).all()

def search_events(db: Session, query: str, fields: List[str] = None) -> List[Event]:
    if not fields:
        fields = ['title', 'description', 'location', 'category']
    
    filters = []
    for field in fields:
        if hasattr(Event, field):
            filters.append(getattr(Event, field).ilike(f'%{query}%'))
    
    if filters:
        return db.query(Event).filter(or_(*filters)).all()
    return []

def create_event(db: Session, event: EventCreate) -> Event:
    db_event = Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def update_event(db: Session, event_id: int, event: EventUpdate) -> Optional[Event]:
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if db_event:
        update_data = event.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_event, field, value)
        
        db_event.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_event)
    return db_event

def delete_event(db: Session, event_id: int) -> bool:
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if db_event:
        db.delete(db_event)
        db.commit()
        return True
    return False

# Donation CRUD
def get_donation(db: Session, donation_id: int) -> Optional[Donation]:
    return db.query(Donation).filter(Donation.id == donation_id).first()

def get_donations(db: Session, skip: int = 0, limit: int = 100) -> List[Donation]:
    return db.query(Donation).order_by(Donation.date.desc()).offset(skip).limit(limit).all()

def search_donations(db: Session, query: str, fields: List[str] = None) -> List[Donation]:
    if not fields:
        fields = ['donor_name', 'email', 'purpose', 'payment_method']
    
    filters = []
    for field in fields:
        if hasattr(Donation, field):
            filters.append(getattr(Donation, field).ilike(f'%{query}%'))
    
    if filters:
        return db.query(Donation).filter(or_(*filters)).all()
    return []

def create_donation(db: Session, donation: DonationCreate) -> Donation:
    db_donation = Donation(**donation.dict())
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation

def update_donation(db: Session, donation_id: int, donation: DonationUpdate) -> Optional[Donation]:
    db_donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if db_donation:
        update_data = donation.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_donation, field, value)
        
        db_donation.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_donation)
    return db_donation

def delete_donation(db: Session, donation_id: int) -> bool:
    db_donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if db_donation:
        db.delete(db_donation)
        db.commit()
        return True
    return False

# Content CRUD
def get_content(db: Session, content_id: int) -> Optional[Content]:
    return db.query(Content).filter(Content.id == content_id).first()

def get_contents(db: Session, skip: int = 0, limit: int = 100) -> List[Content]:
    return db.query(Content).order_by(Content.created_at.desc()).offset(skip).limit(limit).all()

def search_content(db: Session, query: str, fields: List[str] = None) -> List[Content]:
    if not fields:
        fields = ['title', 'content', 'author', 'tags']
    
    filters = []
    for field in fields:
        if hasattr(Content, field):
            filters.append(getattr(Content, field).ilike(f'%{query}%'))
    
    if filters:
        return db.query(Content).filter(or_(*filters)).all()
    return []

def create_content(db: Session, content: ContentCreate) -> Content:
    db_content = Content(
        **content.dict(),
        tags=json.dumps(content.tags) if content.tags else None
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content

def update_content(db: Session, content_id: int, content: ContentUpdate) -> Optional[Content]:
    db_content = db.query(Content).filter(Content.id == content_id).first()
    if db_content:
        update_data = content.dict(exclude_unset=True)
        if 'tags' in update_data:
            update_data['tags'] = json.dumps(update_data['tags'])
        
        for field, value in update_data.items():
            setattr(db_content, field, value)
        
        db_content.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_content)
    return db_content

def delete_content(db: Session, content_id: int) -> bool:
    db_content = db.query(Content).filter(Content.id == content_id).first()
    if db_content:
        db.delete(db_content)
        db.commit()
        return True
    return False

# Quran Ayah CRUD
def get_quran_ayah(db: Session, ayah_id: int) -> Optional[QuranAyah]:
    return db.query(QuranAyah).filter(QuranAyah.id == ayah_id).first()

def get_quran_ayahs(db: Session, skip: int = 0, limit: int = 100) -> List[QuranAyah]:
    return db.query(QuranAyah).order_by(QuranAyah.surah_number, QuranAyah.ayah_number).offset(skip).limit(limit).all()

def get_quran_ayahs_by_surah(db: Session, surah_number: int) -> List[QuranAyah]:
    return db.query(QuranAyah).filter(QuranAyah.surah_number == surah_number).order_by(QuranAyah.ayah_number).all()

def search_quran_ayahs(db: Session, query: str, fields: List[str] = None) -> List[QuranAyah]:
    if not fields:
        fields = ['arabic_text', 'english_translation', 'bengali_translation', 'urdu_translation']
    
    filters = []
    for field in fields:
        if hasattr(QuranAyah, field):
            filters.append(getattr(QuranAyah, field).ilike(f'%{query}%'))
    
    if filters:
        return db.query(QuranAyah).filter(or_(*filters)).all()
    return []

def create_quran_ayah(db: Session, ayah: QuranAyahCreate) -> QuranAyah:
    db_ayah = QuranAyah(**ayah.dict())
    db.add(db_ayah)
    db.commit()
    db.refresh(db_ayah)
    return db_ayah

def update_quran_ayah(db: Session, ayah_id: int, ayah: QuranAyahUpdate) -> Optional[QuranAyah]:
    db_ayah = db.query(QuranAyah).filter(QuranAyah.id == ayah_id).first()
    if db_ayah:
        update_data = ayah.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_ayah, field, value)
        
        db_ayah.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_ayah)
    return db_ayah

def delete_quran_ayah(db: Session, ayah_id: int) -> bool:
    db_ayah = db.query(QuranAyah).filter(QuranAyah.id == ayah_id).first()
    if db_ayah:
        db.delete(db_ayah)
        db.commit()
        return True
    return False

# Service CRUD
def get_service(db: Session, service_id: int) -> Optional[Service]:
    return db.query(Service).filter(Service.id == service_id).first()

def get_services(db: Session, skip: int = 0, limit: int = 100) -> List[Service]:
    return db.query(Service).order_by(Service.order_index, Service.created_at).offset(skip).limit(limit).all()

def get_featured_services(db: Session) -> List[Service]:
    return db.query(Service).filter(Service.featured == True, Service.status == "active").order_by(Service.order_index).all()

def get_services_by_category(db: Session, category: str) -> List[Service]:
    return db.query(Service).filter(Service.category == category, Service.status == "active").order_by(Service.order_index).all()

def search_services(db: Session, query: str) -> List[Service]:
    return db.query(Service).filter(
        or_(
            Service.title.ilike(f'%{query}%'),
            Service.description.ilike(f'%{query}%'),
            Service.category.ilike(f'%{query}%')
        )
    ).all()

def create_service(db: Session, service: ServiceCreate) -> Service:
    db_service = Service(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def update_service(db: Session, service_id: int, service: ServiceUpdate) -> Optional[Service]:
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if db_service:
        update_data = service.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_service, field, value)
        
        db_service.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_service)
    return db_service

def delete_service(db: Session, service_id: int) -> bool:
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if db_service:
        db.delete(db_service)
        db.commit()
        return True
    return False

# Media CRUD
def get_media(db: Session, media_id: int) -> Optional[Media]:
    return db.query(Media).filter(Media.id == media_id).first()

def get_media_items(db: Session, skip: int = 0, limit: int = 100) -> List[Media]:
    return db.query(Media).order_by(Media.created_at.desc()).offset(skip).limit(limit).all()

def get_featured_media(db: Session) -> List[Media]:
    return db.query(Media).filter(Media.featured == True, Media.status == "active").order_by(Media.created_at.desc()).all()

def get_media_by_category(db: Session, category: str) -> List[Media]:
    return db.query(Media).filter(Media.category == category, Media.status == "active").order_by(Media.created_at.desc()).all()

def get_media_by_type(db: Session, media_type: str) -> List[Media]:
    return db.query(Media).filter(Media.type == media_type, Media.status == "active").order_by(Media.created_at.desc()).all()

def search_media(db: Session, query: str) -> List[Media]:
    return db.query(Media).filter(
        or_(
            Media.title.ilike(f'%{query}%'),
            Media.description.ilike(f'%{query}%'),
            Media.category.ilike(f'%{query}%'),
            Media.tags.ilike(f'%{query}%')
        )
    ).all()

def create_media(db: Session, media: MediaCreate) -> Media:
    db_media = Media(
        **media.dict(),
        tags=json.dumps(media.tags) if media.tags else None
    )
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

def update_media(db: Session, media_id: int, media: MediaUpdate) -> Optional[Media]:
    db_media = db.query(Media).filter(Media.id == media_id).first()
    if db_media:
        update_data = media.dict(exclude_unset=True)
        if 'tags' in update_data:
            update_data['tags'] = json.dumps(update_data['tags'])
        
        for field, value in update_data.items():
            setattr(db_media, field, value)
        
        db_media.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_media)
    return db_media

def delete_media(db: Session, media_id: int) -> bool:
    db_media = db.query(Media).filter(Media.id == media_id).first()
    if db_media:
        db.delete(db_media)
        db.commit()
        return True
    return False

# Utility Functions
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
