from sqlalchemy.orm import Session
from app.users.models import User, UserProfile
from app.users.schemas import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password
from app.common.exceptions import ValidationError, NotFoundError
from datetime import datetime
from uuid import UUID

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user(db: Session, user_id: UUID):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user_in: UserCreate):
    if get_user_by_email(db, user_in.email):
        raise ValidationError("Email already registered")
    
    # Create User
    db_user = User(
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        role=user_in.role,
        phone=user_in.phone
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create Profile
    db_profile = UserProfile(
        user_id=db_user.id,
        company_name=user_in.company_name
    )
    db.add(db_profile)
    db.commit()
    
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    return user

def update_user(db: Session, user_id: UUID, user_in: UserUpdate):
    user = get_user(db, user_id)
    if not user:
        raise NotFoundError("User", str(user_id))
    
    if user_in.phone:
        user.phone = user_in.phone
    
    # Update Profile
    if not user.profile:
        user.profile = UserProfile(user_id=user.id)
    
    if user_in.company_name:
        user.profile.company_name = user_in.company_name
    if user_in.business_type:
        user.profile.business_type = user_in.business_type
    if user_in.address:
        user.profile.address = user_in.address
        
    db.commit()
    db.refresh(user)
    return user
