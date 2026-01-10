from sqlalchemy import Column, String, Float, Integer, ForeignKey, Text, CheckConstraint, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB, UUID
from app.core.database import Base
from datetime import datetime
import uuid

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number = Column(String(50), unique=True, nullable=False)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)
    broker_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    
    # Main product reference (for simple v1 orders)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="RESTRICT"), nullable=False)
    
    quantity = Column(Float, nullable=False)
    unit = Column(String(20), default='MT')
    price_per_kg = Column(Float, nullable=False)
    total_value = Column(Float, nullable=False)
    currency = Column(String(3), default='USD')
    
    status = Column(String(30), default='new', index=True)
    order_source = Column(String(20), nullable=True) # buyer_created, seller_created, broker_facilitated
    
    payment_terms = Column(JSONB, nullable=True)
    delivery_terms = Column(JSONB, nullable=True)
    contract_url = Column(String(500), nullable=True)
    special_instructions = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    buyer = relationship("User", foreign_keys=[buyer_id], backref="buyer_orders")
    seller = relationship("User", foreign_keys=[seller_id], backref="seller_orders")
    broker = relationship("User", foreign_keys=[broker_id], backref="brokered_orders")
    product = relationship("Product")
    
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    timeline = relationship("OrderTimeline", back_populates="order", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("status IN ('new', 'processing', 'qc_pending', 'qc_approved', 'qc_rejected', 'payment_pending', 'payment_completed', 'shipped', 'delivered', 'cancelled')", name='check_order_status'),
        CheckConstraint("order_source IN ('buyer_created', 'seller_created', 'broker_facilitated')", name='check_order_source'),
    )

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=True)
    
    product_name = Column(String(255), nullable=True)
    grade = Column(String(50), nullable=True)
    origin = Column(String(100), nullable=True)
    packaging = Column(String(100), nullable=True)
    
    quantity = Column(Float, nullable=False)
    price_per_kg = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    
    order = relationship("Order", back_populates="items")

class OrderTimeline(Base):
    __tablename__ = "order_timeline"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    metadata_ = Column("metadata", JSONB, nullable=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    order = relationship("Order", back_populates="timeline")
