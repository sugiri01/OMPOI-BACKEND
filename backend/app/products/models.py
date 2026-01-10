from sqlalchemy import Column, String, Float, Integer, ForeignKey, Text, CheckConstraint, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from app.core.database import Base
from datetime import datetime
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Product(Base):
    __tablename__ = "products"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    grade = Column(String(50), nullable=True)
    origin = Column(String(100), nullable=False, index=True)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    specifications_json = Column("specifications", JSONB, nullable=False) # Renamed to avoid conflict with relationship
    price_per_kg = Column(Float, nullable=False)
    currency = Column(String(3), default='USD')
    packaging = Column(String(100), nullable=True)
    certifications = Column(JSONB, nullable=True)
    images = Column(JSONB, nullable=True)
    
    # Filter fields
    rating = Column(Float, default=0.0, index=True)
    review_count = Column(Integer, default=0)
    is_primo = Column(Boolean, default=False, index=True)
    stock_location = Column(String(100), nullable=True)
    lead_time = Column(String(50), nullable=True)
    
    status = Column(String(20), default='draft', index=True) # draft, active, inactive
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    seller = relationship("User", backref="products")
    specification_details = relationship("ProductSpecification", back_populates="product", uselist=False, cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("status IN ('draft', 'active', 'inactive')", name='check_product_status'),
    )

class ProductSpecification(Base):
    __tablename__ = "product_specifications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, unique=True)
    nut_count = Column(String(50), nullable=True)
    moisture_content = Column(String(20), nullable=True)
    out_turn = Column(String(20), nullable=True)
    defective_percentage = Column(String(20), nullable=True)
    quality_parameters = Column(JSONB, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    product = relationship("Product", back_populates="specification_details")
