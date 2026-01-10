from sqlalchemy import Column, String, Boolean, DateTime, UUID, Integer, Numeric, Text
from sqlalchemy.dialects.postgresql import JSONB
from app.core.database import Base
from datetime import datetime
import uuid

class Offer(Base):
    """Model for promotional offers and discount codes."""
    __tablename__ = "offers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(50), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    discount_type = Column(String(20), nullable=False)  # percentage, fixed
    discount_value = Column(Numeric(10, 2), nullable=False)
    min_order_value = Column(Numeric(10, 2), nullable=True)
    max_discount = Column(Numeric(10, 2), nullable=True)
    product_type = Column(String(100), nullable=True)  # RCN, W320, etc.
    valid_from = Column(DateTime, nullable=False)
    valid_until = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    usage_limit = Column(Integer, nullable=True)
    usage_count = Column(Integer, default=0)
    extra_data = Column(JSONB, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class FeaturedSupplier(Base):
    """Model for featured/premium suppliers displayed on landing page."""
    __tablename__ = "featured_suppliers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    origin = Column(String(100), nullable=False)
    stock_location = Column(String(100), nullable=False)
    quality_badge = Column(String(50), nullable=False)  # Premium, Verified, Certified
    rating = Column(Numeric(3, 2), nullable=False)
    review_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    logo_url = Column(String(500), nullable=True)
    extra_data = Column(JSONB, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class SystemConfig(Base):
    """Model for general system configuration key-value pairs."""
    __tablename__ = "system_config"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(Text, nullable=False)
    value_type = Column(String(20), nullable=False)  # string, number, boolean, json
    category = Column(String(50), nullable=False)  # ui, business, feature_flags, etc.
    description = Column(Text, nullable=True)
    is_public = Column(Boolean, default=False)  # Whether frontend can access
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Country(Base):
    """Model for supported countries with metadata."""
    __tablename__ = "countries"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), unique=True, nullable=False, index=True)
    code = Column(String(3), unique=True, nullable=False)  # ISO 3166-1 alpha-2
    region = Column(String(50), nullable=True)
    is_supported = Column(Boolean, default=True)
    supports_registration = Column(Boolean, default=True)
    supports_shipping = Column(Boolean, default=True)
    currency_code = Column(String(3), nullable=True)
    phone_code = Column(String(10), nullable=True)
    display_order = Column(Integer, default=0)
    extra_data = Column(JSONB, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
