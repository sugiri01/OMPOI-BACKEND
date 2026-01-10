from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Any

from app.core.database import get_db
from app.core.security import create_access_token
from app.core.config import settings
from app.users import service, schemas, deps
from app.common.responses import success_response
from app.activity.service import log_activity

router = APIRouter()

@router.post("/auth/register", response_model=schemas.UserResponse)
def register(
    user_in: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    """Register a new user"""
    user = service.create_user(db, user_in)
    
    # Log activity
    log_activity(
        db=db,
        action="register",
        module="users",
        user_id=user.id,
        metadata={"email": user.email, "role": user.role}
    )
    
    return user

@router.post("/auth/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login to get access token"""
    user = service.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    
    # Log activity
    log_activity(
        db=db,
        action="login",
        module="users",
        user_id=user.id
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/profile", response_model=schemas.UserResponse)
def read_users_profile(
    current_user = Depends(deps.get_current_active_user)
):
    """Get current user profile"""
    return current_user

@router.put("/users/profile", response_model=schemas.UserResponse)
def update_user_profile(
    user_in: schemas.UserUpdate,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update current user profile"""
    user = service.update_user(db, current_user.id, user_in)
    
    # Log activity
    log_activity(
        db=db,
        action="update_profile",
        module="users",
        user_id=user.id
    )
    
    return user
