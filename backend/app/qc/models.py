from sqlalchemy import Column, String, Float, Integer, ForeignKey, Text, CheckConstraint, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB, UUID
from app.core.database import Base
from datetime import datetime
import uuid

class QCInspection(Base):
    __tablename__ = "qc_inspections"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    
    inspection_date = Column(DateTime, nullable=True)
    location = Column(String(255), nullable=True)
    status = Column(String(30), default='pending', index=True) # pending, in_progress, completed, approved, rejected
    
    sample_size = Column(Float, nullable=True)
    sample_unit = Column(String(20), default='kg')
    
    overall_grade = Column(String(50), nullable=True)
    pass_fail = Column(Boolean, nullable=True)
    
    notes = Column(Text, nullable=True)
    images = Column(JSONB, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    order = relationship("Order", backref="qc_inspections")
    agent = relationship("User", foreign_keys=[agent_id], backref="qc_assignments")
    report = relationship("QCReport", back_populates="inspection", uselist=False, cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("status IN ('pending', 'in_progress', 'completed', 'approved', 'rejected')", name='check_qc_status'),
    )

class QCReport(Base):
    __tablename__ = "qc_reports"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    inspection_id = Column(UUID(as_uuid=True), ForeignKey("qc_inspections.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    # Quality parameters
    nut_count = Column(String(50), nullable=True)
    moisture_content = Column(Float, nullable=True)
    out_turn = Column(Float, nullable=True)
    defective_percentage = Column(Float, nullable=True)
    broken_percentage = Column(Float, nullable=True)
    
    # Additional parameters
    color = Column(String(50), nullable=True)
    size_uniformity = Column(String(50), nullable=True)
    foreign_matter = Column(Float, nullable=True)
    
    test_results = Column(JSONB, nullable=True)
    recommendations = Column(Text, nullable=True)
    
    approved_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    approved_at = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    inspection = relationship("QCInspection", back_populates="report")
