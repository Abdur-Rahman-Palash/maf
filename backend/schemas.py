from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Base Schema
class BaseSchema(BaseModel):
    class Config:
        from_attributes = True

# User Schemas
class UserBase(BaseSchema):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    role: str = "member"
    status: str = "active"
    skills: Optional[List[str]] = []
    notes: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseSchema):
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None
    skills: Optional[List[str]] = None
    notes: Optional[str] = None

class User(UserBase):
    id: int
    join_date: datetime
    created_at: datetime
    updated_at: datetime

# Event Schemas
class EventBase(BaseSchema):
    title: str
    description: Optional[str] = None
    date: datetime
    time: str
    location: str
    category: str
    max_attendees: Optional[int] = None
    status: str = "upcoming"

class EventCreate(EventBase):
    pass

class EventUpdate(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    time: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    max_attendees: Optional[int] = None
    status: Optional[str] = None

class Event(EventBase):
    id: int
    current_attendees: int
    created_at: datetime
    updated_at: datetime

# Donation Schemas
class DonationBase(BaseSchema):
    donor_name: str
    email: EmailStr
    amount: float
    type: str  # one-time, monthly, zakat, sadaqa
    purpose: str
    status: str = "pending"
    payment_method: Optional[str] = None
    recurring: bool = False

class DonationCreate(DonationBase):
    pass

class DonationUpdate(BaseSchema):
    donor_name: Optional[str] = None
    email: Optional[EmailStr] = None
    amount: Optional[float] = None
    type: Optional[str] = None
    purpose: Optional[str] = None
    status: Optional[str] = None
    payment_method: Optional[str] = None
    recurring: Optional[bool] = None

class Donation(DonationBase):
    id: int
    date: datetime
    created_at: datetime
    updated_at: datetime

# Content Schemas
class ContentBase(BaseSchema):
    title: str
    type: str  # sermon, announcement, blog, page
    content: str
    author: str
    status: str = "draft"
    publish_date: Optional[datetime] = None
    tags: Optional[List[str]] = []

class ContentCreate(ContentBase):
    pass

class ContentUpdate(BaseSchema):
    title: Optional[str] = None
    type: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    status: Optional[str] = None
    publish_date: Optional[datetime] = None
    tags: Optional[List[str]] = None

class Content(ContentBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Quran Ayah Schemas
class QuranAyahBase(BaseSchema):
    surah_number: int
    ayah_number: int
    arabic_text: str
    english_translation: str
    bengali_translation: str
    urdu_translation: Optional[str] = None
    audio_url: Optional[str] = None
    status: str = "active"

class QuranAyahCreate(QuranAyahBase):
    pass

class QuranAyahUpdate(BaseSchema):
    surah_number: Optional[int] = None
    ayah_number: Optional[int] = None
    arabic_text: Optional[str] = None
    english_translation: Optional[str] = None
    bengali_translation: Optional[str] = None
    urdu_translation: Optional[str] = None
    audio_url: Optional[str] = None
    status: Optional[str] = None

class QuranAyah(QuranAyahBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Service Schemas
class ServiceBase(BaseSchema):
    title: str
    description: str
    category: str  # prayer, education, community, welfare
    icon: Optional[str] = None
    image_url: Optional[str] = None
    status: str = "active"
    featured: bool = False
    order_index: int = 0

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    icon: Optional[str] = None
    image_url: Optional[str] = None
    status: Optional[str] = None
    featured: Optional[bool] = None
    order_index: Optional[int] = None

class Service(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Media Schemas
class MediaBase(BaseSchema):
    title: str
    description: Optional[str] = None
    type: str  # image, video, audio, document
    file_url: str
    thumbnail_url: Optional[str] = None
    category: str  # gallery, sermon, event, announcement
    tags: Optional[List[str]] = []
    file_size: Optional[int] = None
    duration: Optional[str] = None
    status: str = "active"
    featured: bool = False

class MediaCreate(MediaBase):
    pass

class MediaUpdate(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    file_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    file_size: Optional[int] = None
    duration: Optional[str] = None
    status: Optional[str] = None
    featured: Optional[bool] = None

class Media(MediaBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Auth Schemas
class Token(BaseSchema):
    access_token: str
    token_type: str

class TokenData(BaseSchema):
    email: EmailStr
