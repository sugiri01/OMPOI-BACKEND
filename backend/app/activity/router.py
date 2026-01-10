from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from uuid import UUID
from app.core.database import get_db
from app.activity import service
from app.common.responses import success_response

router = APIRouter(prefix="/activity", tags=["activity"])

class LogCreate(BaseModel):
    action: str
    module: str
    user_id: Optional[UUID] = None
    record_id: Optional[UUID] = None
    metadata: Optional[dict] = None

@router.post("/log")
def create_log(
    log_data: LogCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Internal endpoint to create activity log"""
    # Extract IP and User-Agent if not provided in metadata? 
    # For internal calls, these might need to be passed explicitly if they originate from user request
    
    service.log_activity(
        db=db,
        action=log_data.action,
        module=log_data.module,
        user_id=log_data.user_id,
        record_id=log_data.record_id,
        metadata=log_data.metadata,
        ip_address=request.client.host,
        user_agent=request.headers.get("user-agent")
    )
    return success_response("Activity logged successfully")
