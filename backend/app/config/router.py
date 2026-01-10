from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.config import schemas
from app.config.models import Offer, FeaturedSupplier, SystemConfig, Country
from app.common.responses import success_response

router = APIRouter()


# Offer Endpoints
@router.get("/offers", response_model=List[schemas.OfferResponse])
def get_active_offers(
    product_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all active offers, optionally filtered by product type."""
    query = db.query(Offer).filter(
        Offer.is_active == True,
        Offer.valid_from <= datetime.utcnow(),
        Offer.valid_until >= datetime.utcnow()
    )
    
    if product_type:
        query = query.filter(Offer.product_type == product_type)
    
    offers = query.order_by(Offer.created_at.desc()).all()
    return offers


@router.get("/offers/{offer_code}", response_model=schemas.OfferResponse)
def get_offer_by_code(
    offer_code: str,
    db: Session = Depends(get_db)
):
    """Get a specific offer by code."""
    offer = db.query(Offer).filter(Offer.code == offer_code).first()
    if not offer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Offer with code '{offer_code}' not found"
        )
    return offer


# Featured Supplier Endpoints
@router.get("/suppliers/featured", response_model=List[schemas.FeaturedSupplierResponse])
def get_featured_suppliers(
    limit: int = Query(default=10, le=50),
    db: Session = Depends(get_db)
):
    """Get featured suppliers for display on landing page."""
    suppliers = db.query(FeaturedSupplier).filter(
        FeaturedSupplier.is_active == True
    ).order_by(
        FeaturedSupplier.display_order.asc(),
        FeaturedSupplier.rating.desc()
    ).limit(limit).all()
    
    return suppliers


# System Config Endpoints
@router.get("/system/{config_key}")
def get_system_config(
    config_key: str,
    db: Session = Depends(get_db)
):
    """Get a system configuration value by key (public configs only)."""
    config = db.query(SystemConfig).filter(
        SystemConfig.key == config_key,
        SystemConfig.is_public == True
    ).first()
    
    if not config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Configuration '{config_key}' not found or not public"
        )
    
    # Parse value based on type
    value = config.value
    if config.value_type == "number":
        value = float(value)
    elif config.value_type == "boolean":
        value = value.lower() == "true"
    elif config.value_type == "json":
        import json
        value = json.loads(value)
    
    return {
        "key": config.key,
        "value": value,
        "category": config.category,
        "description": config.description
    }


@router.get("/system/category/{category}")
def get_system_configs_by_category(
    category: str,
    db: Session = Depends(get_db)
):
    """Get all public system configurations in a category."""
    configs = db.query(SystemConfig).filter(
        SystemConfig.category == category,
        SystemConfig.is_public == True
    ).all()
    
    result = {}
    for config in configs:
        value = config.value
        if config.value_type == "number":
            value = float(value)
        elif config.value_type == "boolean":
            value = value.lower() == "true"
        elif config.value_type == "json":
            import json
            value = json.loads(value)
        
        result[config.key] = {
            "value": value,
            "description": config.description
        }
    
    return result


# Country Endpoints
@router.get("/countries", response_model=List[schemas.CountryResponse])
def get_countries(
    supports_registration: Optional[bool] = None,
    supports_shipping: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """Get list of countries, optionally filtered."""
    query = db.query(Country).filter(Country.is_supported == True)
    
    if supports_registration is not None:
        query = query.filter(Country.supports_registration == supports_registration)
    
    if supports_shipping is not None:
        query = query.filter(Country.supports_shipping == supports_shipping)
    
    countries = query.order_by(
        Country.display_order.asc(),
        Country.name.asc()
    ).all()
    
    return countries


@router.get("/countries/{country_code}", response_model=schemas.CountryResponse)
def get_country_by_code(
    country_code: str,
    db: Session = Depends(get_db)
):
    """Get country details by code."""
    country = db.query(Country).filter(Country.code == country_code).first()
    if not country:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Country with code '{country_code}' not found"
        )
    return country
