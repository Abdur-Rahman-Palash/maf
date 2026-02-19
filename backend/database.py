from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, Boolean, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:password@localhost:3306/masjid_db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(20), default="member")
    phone = Column(String(20))
    address = Column(Text)
    join_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String(20), default="active")
    skills = Column(Text)  # JSON string
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    date = Column(DateTime, nullable=False)
    time = Column(String(10), nullable=False)
    location = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False)
    max_attendees = Column(Integer)
    current_attendees = Column(Integer, default=0)
    status = Column(String(20), default="upcoming")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Donation(Base):
    __tablename__ = "donations"
    
    id = Column(Integer, primary_key=True, index=True)
    donor_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String(20), nullable=False)  # one-time, monthly, zakat, sadaqa
    purpose = Column(String(200), nullable=False)
    status = Column(String(20), default="pending")
    payment_method = Column(String(50))
    date = Column(DateTime, default=datetime.utcnow)
    recurring = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Content(Base):
    __tablename__ = "content"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    type = Column(String(20), nullable=False)  # sermon, announcement, blog, page
    content = Column(Text, nullable=False)
    author = Column(String(100), nullable=False)
    status = Column(String(20), default="draft")
    publish_date = Column(DateTime)
    tags = Column(Text)  # JSON string
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class QuranAyah(Base):
    __tablename__ = "quran_ayahs"
    
    id = Column(Integer, primary_key=True, index=True)
    surah_number = Column(Integer, nullable=False)
    ayah_number = Column(Integer, nullable=False)
    arabic_text = Column(Text, nullable=False)
    english_translation = Column(Text, nullable=False)
    bengali_translation = Column(Text, nullable=False)
    urdu_translation = Column(Text)
    audio_url = Column(String(500))
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)  # prayer, education, community, welfare
    icon = Column(String(100))  # icon name or URL
    image_url = Column(String(500))
    status = Column(String(20), default="active")
    featured = Column(Boolean, default=False)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Media(Base):
    __tablename__ = "media"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    type = Column(String(20), nullable=False)  # image, video, audio, document
    file_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500))
    category = Column(String(50), nullable=False)  # gallery, sermon, event, announcement
    tags = Column(Text)  # JSON string
    file_size = Column(Integer)  # in bytes
    duration = Column(String(20))  # for video/audio
    status = Column(String(20), default="active")
    featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables()
    print("Tables created successfully!")
