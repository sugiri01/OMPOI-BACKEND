from typing import Optional, Any
from pydantic import BaseModel, Field, validator
from datetime import datetime
from uuid import UUID
from decimal import Decimal


# Offer Schemas
class OfferBase(BaseModel):
    code: str = Field(..., max_length=50)
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    discount_type: str = Field(..., pattern="^(percentage|fixed)$")
    discount_value: Decimal
    min_order_value: Optional[Decimal] = None
    max_discount: Optional[Decimal] = None
    product_type: Optional[str] = None
    valid_from: datetime
    valid_until: datetime
    is_active: bool = True
    usage_limit: Optional[int] = None
    extra_data: Optional[dict] = None


class OfferCreate(OfferBase):
    pass


class OfferUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None
    valid_until: Optional[datetime] = None
    usage_limit: Optional[int] = None


class OfferResponse(OfferBase):
    id: UUID
    usage_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Featured Supplier Schemas
class FeaturedSupplierBase(BaseModel):
    name: str = Field(..., max_length=255)
    origin: str = Field(..., max_length=100)
    stock_location: str = Field(..., max_length=100)
    quality_badge: str = Field(..., max_length=50)
    rating: Decimal = Field(..., ge=0, le=5)
    review_count: int = Field(default=0, ge=0)
    is_active: bool = True
    display_order: int = 0
    logo_url: Optional[str] = None
    extra_data: Optional[dict] = None


class FeaturedSupplierCreate(FeaturedSupplierBase):
    pass


class FeaturedSupplierUpdate(BaseModel):
    name: Optional[str] = None
    stock_location: Optional[str] = None
    quality_badge: Optional[str] = None
    rating: Optional[Decimal] = None
    review_count: Optional[int] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None


class FeaturedSupplierResponse(FeaturedSupplierBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# System Config Schemas
class SystemConfigBase(BaseModel):
    key: str = Field(..., max_length=100)
    value: str
    value_type: str = Field(..., pattern="^(string|number|boolean|json)$")
    category: str = Field(..., max_length=50)
    description: Optional[str] = None
    is_public: bool = False


class SystemConfigCreate(SystemConfigBase):
    pass


class SystemConfigUpdate(BaseModel):
    value: Optional[str] = None
    description: Optional[str] = None
    is_public: Optional[bool] = None


class SystemConfigResponse(SystemConfigBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Country Schemas
class CountryBase(BaseModel):
    name: str = Field(..., max_length=100)
    code: str = Field(..., max_length=3)
    region: Optional[str] = None
    is_supported: bool = True
    supports_registration: bool = True
    supports_shipping: bool = True
    currency_code: Optional[str] = None
    phone_code: Optional[str] = None
    display_order: int = 0
    extra_data: Optional[dict] = None


class CountryCreate(CountryBase):
    pass


class CountryUpdate(BaseModel):
    is_supported: Optional[bool] = None
    supports_registration: Optional[bool] = None
    supports_shipping: Optional[bool] = None
    display_order: Optional[int] = None


class CountryResponse(CountryBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
