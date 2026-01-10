from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.core.database import get_db
from app.users import deps
from app.products import service, schemas
from app.common.responses import success_response, paginated_response
from app.activity.service import log_activity

router = APIRouter()

@router.post("/", response_model=schemas.ProductResponse)
def create_product(
    product_in: schemas.ProductCreate,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new product listing"""
    if current_user.role not in ['seller', 'admin']:
        # TODO: Add proper permission check
        pass 
        
    product = service.create_product(db, product_in, current_user.id)
    
    log_activity(
        db=db,
        action="create_product",
        module="products",
        user_id=current_user.id,
        record_id=product.id,
        metadata={"name": product.name}
    )
    
    return product

@router.get("/", response_model=List[schemas.ProductResponse])
def list_products(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = 'active',
    seller_id: Optional[UUID] = None,
    origins: Optional[List[str]] = Query(None),
    nut_counts: Optional[List[str]] = Query(None),
    is_primo: Optional[bool] = None,
    certifications: Optional[List[str]] = Query(None),
    min_rating: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """List products with filters"""
    products = service.get_products(
        db, 
        skip=skip, 
        limit=limit, 
        status=status, 
        seller_id=seller_id,
        origins=origins,
        nut_counts=nut_counts,
        is_primo=is_primo,
        certifications=certifications,
        min_rating=min_rating
    )
    return products

@router.get("/search", response_model=List[schemas.ProductResponse])
def search_products(
    q: str,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Search products"""
    return service.search_products(db, query=q, limit=limit)

@router.get("/{product_id}", response_model=schemas.ProductResponse)
def get_product(
    product_id: UUID,
    db: Session = Depends(get_db)
):
    """Get product details"""
    product = service.get_product(db, product_id)
    if not product:
        from app.common.exceptions import NotFoundError
        raise NotFoundError("Product", str(product_id))
    return product

@router.put("/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    product_id: UUID,
    product_in: schemas.ProductUpdate,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update product"""
    product = service.update_product(db, product_id, product_in, current_user.id)
    
    log_activity(
        db=db,
        action="update_product",
        module="products",
        user_id=current_user.id,
        record_id=product.id
    )
    
    return product

@router.delete("/{product_id}")
def delete_product(
    product_id: UUID,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete product"""
    service.delete_product(db, product_id, current_user.id)
    
    log_activity(
        db=db,
        action="delete_product",
        module="products",
        user_id=current_user.id,
        record_id=product_id
    )
    
    return success_response("Product deleted successfully")
