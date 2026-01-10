from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID

# Shared properties
class ProductBase(BaseModel):
    name: str
    grade: Optional[str] = None
    origin: str
    category: Optional[str] = None
    description: Optional[str] = None
    price_per_kg: float
    currency: str = "USD"
    packaging: Optional[str] = None
    certifications: Optional[List[str]] = None
    images: Optional[List[str]] = None
    rating: Optional[float] = 0.0
    review_count: Optional[int] = 0
    is_primo: Optional[bool] = False
    stock_location: Optional[str] = None
    lead_time: Optional[str] = None
    specifications: Dict[str, Any] = Field(default_factory=dict)

# Properties to receive on item creation
class ProductCreate(ProductBase):
    nut_count: Optional[str] = None
    moisture_content: Optional[str] = None
    out_turn: Optional[str] = None
    defective_percentage: Optional[str] = None
    quality_parameters: Optional[Dict[str, Any]] = None

# Properties to receive on item update
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    grade: Optional[str] = None
    origin: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price_per_kg: Optional[float] = None
    currency: Optional[str] = None
    packaging: Optional[str] = None
    certifications: Optional[List[str]] = None
    images: Optional[List[str]] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    is_primo: Optional[bool] = None
    stock_location: Optional[str] = None
    lead_time: Optional[str] = None
    status: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None
    nut_count: Optional[str] = None
    moisture_content: Optional[str] = None
    out_turn: Optional[str] = None
    defective_percentage: Optional[str] = None
    quality_parameters: Optional[Dict[str, Any]] = None

# Properties to return to client
class ProductSpecificationResponse(BaseModel):
    nut_count: Optional[str] = None
    moisture_content: Optional[str] = None
    out_turn: Optional[str] = None
    defective_percentage: Optional[str] = None
    quality_parameters: Optional[Dict[str, Any]] = None

class ProductResponse(ProductBase):
    id: UUID
    seller_id: UUID
    status: str
    created_at: datetime
    updated_at: datetime
    specification_details: Optional[ProductSpecificationResponse] = None

    class Config:
        orm_mode = True
