from sqlalchemy.orm import Session
from app.activity.models import ActivityLog
from typing import Optional, Dict, Any
from uuid import UUID

def log_activity(
    db: Session,
    action: str,
    module: str,
    user_id: Optional[UUID] = None,
    record_id: Optional[UUID] = None,
    metadata: Optional[Dict[str, Any]] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
):
    """Create a new activity log entry"""
    log_entry = ActivityLog(
        user_id=user_id,
        action=action,
        module=module,
        record_id=record_id,
        metadata_=metadata,
        ip_address=ip_address,
        user_agent=user_agent
    )
    db.add(log_entry)
    db.commit()
    db.refresh(log_entry)
    return log_entry

def get_user_activity(db: Session, user_id: UUID, limit: int = 50):
    """Get activity logs for a specific user"""
    return db.query(ActivityLog).filter(ActivityLog.user_id == user_id)\
        .order_by(ActivityLog.created_at.desc()).limit(limit).all()
