from typing import Optional
from pydantic import BaseModel, EmailStr, constr
from datetime import datetime
from uuid import UUID

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    role: str

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str
    phone: Optional[str] = None
    company_name: Optional[str] = None

# Properties to receive via API on update
class UserUpdate(BaseModel):
    phone: Optional[str] = None
    company_name: Optional[str] = None
    business_type: Optional[str] = None
    address: Optional[dict] = None

# Properties to return via API
class UserProfile(BaseModel):
    company_name: Optional[str] = None
    business_type: Optional[str] = None
    address: Optional[dict] = None
    documents: Optional[dict] = None

class UserResponse(UserBase):
    id: UUID
    status: str
    email_verified: bool
    created_at: datetime
    last_login: Optional[datetime] = None
    profile: Optional[UserProfile] = None

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
