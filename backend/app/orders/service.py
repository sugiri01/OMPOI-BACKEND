from sqlalchemy.orm import Session
from app.orders.models import Order, OrderTimeline
from app.orders.schemas import OrderCreate, OrderUpdate
from app.common.utils import generate_order_number
from app.common.exceptions import NotFoundError, ForbiddenError
from uuid import UUID
from typing import Optional, List

def get_order(db: Session, order_id: UUID) -> Optional[Order]:
    return db.query(Order).filter(Order.id == order_id).first()

def get_orders(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    buyer_id: Optional[UUID] = None,
    seller_id: Optional[UUID] = None,
    broker_id: Optional[UUID] = None
) -> List[Order]:
    query = db.query(Order)
    
    if buyer_id:
        query = query.filter(Order.buyer_id == buyer_id)
    
    if seller_id:
        query = query.filter(Order.seller_id == seller_id)
        
    if broker_id:
        query = query.filter(Order.broker_id == broker_id)
        
    return query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

def create_order(db: Session, order_in: OrderCreate, buyer_id: UUID) -> Order:
    total_value = order_in.quantity * order_in.price_per_kg
    
    db_order = Order(
        order_number=generate_order_number(),
        buyer_id=buyer_id,
        seller_id=order_in.seller_id,
        broker_id=order_in.broker_id,
        product_id=order_in.product_id,
        quantity=order_in.quantity,
        unit=order_in.unit,
        price_per_kg=order_in.price_per_kg,
        total_value=total_value,
        currency=order_in.currency,
        order_source=order_in.order_source,
        payment_terms=order_in.payment_terms,
        delivery_terms=order_in.delivery_terms,
        special_instructions=order_in.special_instructions,
        status='new'
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Add initial timeline entry
    add_timeline_entry(db, db_order.id, 'new', 'Order created', buyer_id)
    
    return db_order

def update_order_status(
    db: Session, 
    order_id: UUID, 
    status: str, 
    user_id: UUID,
    description: Optional[str] = None
) -> Order:
    order = get_order(db, order_id)
    if not order:
        raise NotFoundError("Order", str(order_id))
    
    # Simple state transition validation could go here
    
    order.status = status
    db.commit()
    db.refresh(order)
    
    add_timeline_entry(db, order.id, status, description or f"Status updated to {status}", user_id)
    
    return order

def add_timeline_entry(
    db: Session, 
    order_id: UUID, 
    status: str, 
    description: str, 
    user_id: Optional[UUID] = None
):
    timeline = OrderTimeline(
        order_id=order_id,
        status=status,
        description=description,
        created_by=user_id
    )
    db.add(timeline)
    db.commit()
