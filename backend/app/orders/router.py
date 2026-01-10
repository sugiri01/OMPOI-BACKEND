from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.core.database import get_db
from app.users import deps
from app.orders import service, schemas
from app.activity.service import log_activity
from app.common.exceptions import ForbiddenError

router = APIRouter()

@router.post("/", response_model=schemas.OrderResponse)
def create_order(
    order_in: schemas.OrderCreate,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new order"""
    order = service.create_order(db, order_in, current_user.id)
    
    log_activity(
        db=db,
        action="create_order",
        module="orders",
        user_id=current_user.id,
        record_id=order.id,
        metadata={"order_number": order.order_number}
    )
    
    return order

@router.get("/", response_model=List[schemas.OrderResponse])
def list_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """List orders (filtered by user role)"""
    buyer_id = None
    seller_id = None
    broker_id = None
    
    if current_user.role == 'buyer':
        buyer_id = current_user.id
    elif current_user.role == 'seller':
        seller_id = current_user.id
    elif current_user.role == 'agent':
        broker_id = current_user.id
    # Admin sees all
        
    return service.get_orders(
        db, 
        skip=skip, 
        limit=limit, 
        buyer_id=buyer_id, 
        seller_id=seller_id, 
        broker_id=broker_id
    )

@router.get("/{order_id}", response_model=schemas.OrderResponse)
def get_order(
    order_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Get order details"""
    order = service.get_order(db, order_id)
    if not order:
        from app.common.exceptions import NotFoundError
        raise NotFoundError("Order", str(order_id))
    
    # Check permissions
    if current_user.role != 'admin':
        if current_user.id not in [order.buyer_id, order.seller_id, order.broker_id]:
            raise ForbiddenError("You do not have access to this order")
            
    return order

@router.put("/{order_id}/status", response_model=schemas.OrderResponse)
def update_order_status(
    order_id: UUID,
    status_update: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Update order status"""
    if not status_update.status:
        # Just return order if no status change requested
        return service.get_order(db, order_id)
        
    order = service.update_order_status(
        db, 
        order_id, 
        status_update.status, 
        current_user.id,
        description=status_update.special_instructions
    )
    
    log_activity(
        db=db,
        action="update_order_status",
        module="orders",
        user_id=current_user.id,
        record_id=order.id,
        metadata={"status": status_update.status}
    )
    
    return order
