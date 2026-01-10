from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

# Shared properties
class OrderBase(BaseModel):
    product_id: UUID
    quantity: float
    unit: str = "MT"
    price_per_kg: float
    currency: str = "USD"
    payment_terms: Optional[Dict[str, Any]] = None
    delivery_terms: Optional[Dict[str, Any]] = None
    special_instructions: Optional[str] = None

# Properties to receive on creation
class OrderCreate(OrderBase):
    seller_id: UUID
    broker_id: Optional[UUID] = None
    order_source: Optional[str] = "buyer_created"

# Properties to receive on update
class OrderUpdate(BaseModel):
    status: Optional[str] = None
    contract_url: Optional[str] = None
    special_instructions: Optional[str] = None

# Timeline schema
class OrderTimelineResponse(BaseModel):
    status: str
    description: Optional[str] = None
    created_at: datetime
    created_by: Optional[UUID] = None
    
    class Config:
        orm_mode = True

# Properties to return to client
class OrderResponse(OrderBase):
    id: UUID
    order_number: str
    buyer_id: UUID
    seller_id: UUID
    broker_id: Optional[UUID] = None
    total_value: float
    status: str
    order_source: Optional[str] = None
    contract_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    timeline: List[OrderTimelineResponse] = []

    class Config:
        orm_mode = True
