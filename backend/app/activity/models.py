from sqlalchemy import Column, String, DateTime, UUID, Text
from sqlalchemy.dialects.postgresql import JSONB
from app.core.database import Base
from datetime import datetime
import uuid

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=True) # Nullable for system actions or unauthenticated
    action = Column(String(100), nullable=False)
    module = Column(String(50), nullable=False)
    record_id = Column(UUID(as_uuid=True), nullable=True)
    metadata_ = Column("metadata", JSONB, nullable=True) # 'metadata' is reserved in SQLAlchemy Base
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
