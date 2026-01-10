from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.products.models import Product, ProductSpecification
from app.products.schemas import ProductCreate, ProductUpdate
from app.common.exceptions import NotFoundError, ForbiddenError
from uuid import UUID
from typing import Optional, List

def get_product(db: Session, product_id: UUID) -> Optional[Product]:
    return db.query(Product).filter(Product.id == product_id).first()

def get_products(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = 'active',
    seller_id: Optional[UUID] = None,
    # New filters
    origins: Optional[List[str]] = None,
    nut_counts: Optional[List[str]] = None,
    is_primo: Optional[bool] = None,
    certifications: Optional[List[str]] = None,
    min_rating: Optional[float] = None
) -> List[Product]:
    # Start with base query
    query = db.query(Product)
    
    if status:
        query = query.filter(Product.status == status)
    
    if seller_id:
        query = query.filter(Product.seller_id == seller_id)
        
    if origins:
        query = query.filter(Product.origin.in_(origins))
        
    if nut_counts:
        # Use subquery to filter by nut_count
        subquery = db.query(ProductSpecification.product_id).filter(
            ProductSpecification.nut_count.in_(nut_counts)
        ).subquery()
        query = query.filter(Product.id.in_(subquery))
        
    if is_primo is not None:
        query = query.filter(Product.is_primo == is_primo)
        
    if min_rating:
        query = query.filter(Product.rating >= min_rating)
        
    if certifications:
        # Basic JSONB check: if any of the requested certifications are present
        for cert in certifications:
             query = query.filter(Product.certifications.contains([cert]))

    return query.offset(skip).limit(limit).all()

def search_products(db: Session, query: str, limit: int = 20) -> List[Product]:
    search = f"%{query}%"
    return db.query(Product).filter(
        or_(
            Product.name.ilike(search),
            Product.origin.ilike(search),
            Product.category.ilike(search)
        ),
        Product.status == 'active'
    ).limit(limit).all()

def create_product(db: Session, product_in: ProductCreate, seller_id: UUID) -> Product:
    # Create Product
    db_product = Product(
        seller_id=seller_id,
        name=product_in.name,
        grade=product_in.grade,
        origin=product_in.origin,
        category=product_in.category,
        description=product_in.description,
        specifications_json=product_in.specifications,
        price_per_kg=product_in.price_per_kg,
        currency=product_in.currency,
        packaging=product_in.packaging,
        certifications=product_in.certifications,
        images=product_in.images,
        status='draft' # Default to draft
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    # Create Specifications
    db_spec = ProductSpecification(
        product_id=db_product.id,
        nut_count=product_in.nut_count,
        moisture_content=product_in.moisture_content,
        out_turn=product_in.out_turn,
        defective_percentage=product_in.defective_percentage,
        quality_parameters=product_in.quality_parameters
    )
    db.add(db_spec)
    db.commit()
    db.refresh(db_product)
    
    return db_product

def update_product(
    db: Session, 
    product_id: UUID, 
    product_in: ProductUpdate, 
    seller_id: UUID
) -> Product:
    product = get_product(db, product_id)
    if not product:
        raise NotFoundError("Product", str(product_id))
    
    if product.seller_id != seller_id:
        raise ForbiddenError("You can only update your own products")
    
    # Update Product fields
    update_data = product_in.dict(exclude_unset=True)
    
    # Handle nested specifications separately
    spec_fields = ['nut_count', 'moisture_content', 'out_turn', 'defective_percentage', 'quality_parameters']
    
    for field in spec_fields:
        if field in update_data:
            setattr(product.specification_details, field, update_data.pop(field))
            
    if 'specifications' in update_data:
        product.specifications_json = update_data.pop('specifications')
        
    for key, value in update_data.items():
        setattr(product, key, value)
        
    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: UUID, seller_id: UUID):
    product = get_product(db, product_id)
    if not product:
        raise NotFoundError("Product", str(product_id))
    
    if product.seller_id != seller_id:
        raise ForbiddenError("You can only delete your own products")
        
    db.delete(product)
    db.commit()
