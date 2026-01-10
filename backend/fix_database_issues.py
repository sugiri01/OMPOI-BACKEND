"""
Fix database issues:
1. Add proper supplier names (company names) instead of numerical IDs
2. Ensure Benin has products
"""

from app.core.database import SessionLocal
from app.products.models import Product
from app.users.models import User, UserProfile
from sqlalchemy import update

db = SessionLocal()

try:
    print("="*80)
    print("FIXING DATABASE ISSUES")
    print("="*80)
    
    # 1. Update seller names to proper company names
    sellers = db.query(User).filter(User.role == 'seller').all()
    
    company_names = [
        "OMPOI Cashew Exports",
        "Global Traders Ltd",
        "Kerala Premium Cashews",
        "Tanzania Suppliers Co",
        "Vietnam Agro Trading",
        "Brazil Nuts International",
        "Ghana Premium Exports",
        "Benin Quality Cashews"
    ]
    
    print("\n1. Updating Supplier Names:")
    print("-" * 80)
    for idx, seller in enumerate(sellers):
        company_name = company_names[idx % len(company_names)]
        
        # Update or create user profile
        profile = db.query(UserProfile).filter(UserProfile.user_id == seller.id).first()
        if profile:
            profile.company_name = company_name
            print(f"✓ Updated: {seller.email} -> {company_name}")
        else:
            from uuid import uuid4
            profile = UserProfile(
                id=uuid4(),
                user_id=seller.id,
                company_name=company_name,
                business_type="Exporter"
            )
            db.add(profile)
            print(f"✓ Created profile: {seller.email} -> {company_name}")
    
    db.commit()
    
    # 2. Check Benin products
    print("\n2. Checking Benin Products:")
    print("-" * 80)
    benin_count = db.query(Product).filter(
        Product.origin == "Benin",
        Product.status == "active"
    ).count()
    
    print(f"Current Benin products: {benin_count}")
    
    if benin_count == 0:
        print("⚠️  No Benin products found! Adding Benin products...")
        
        from decimal import Decimal
        from uuid import uuid4
        from app.products.models import ProductSpecification
        
        benin_seller = sellers[0]  # Use first seller
        
        benin_products = [
            {"name": "RCN W320", "nut_count": "160-180/kg", "certs": ["Organic"], "rating": 4.7, "primo": True, "price": 2.80},
            {"name": "RCN W240", "nut_count": "185-195/kg", "certs": ["Fair Trade"], "rating": 4.5, "primo": False, "price": 2.60},
            {"name": "RCN W180", "nut_count": "190/kg", "certs": ["RBS Certified"], "rating": 4.8, "primo": True, "price": 3.00},
        ]
        
        for prod_data in benin_products:
            product = Product(
                id=uuid4(),
                seller_id=benin_seller.id,
                name=prod_data["name"],
                origin="Benin",
                price_per_kg=Decimal(str(prod_data["price"])),
                currency="USD",
                status="active",
                rating=Decimal(str(prod_data["rating"])),
                review_count=int(prod_data["rating"] * 50),
                is_primo=prod_data["primo"],
                stock_location="Tuticorin Stock" if prod_data["primo"] else "Standard Warehouse",
                lead_time="7-10 days" if prod_data["primo"] else "14-21 days",
                certifications=prod_data["certs"],
                category="Raw Cashew Nuts",
                grade="Premium",
                description=f"High quality {prod_data['name']} from Benin"
            )
            
            db.add(product)
            db.flush()
            
            spec = ProductSpecification(
                id=uuid4(),
                product_id=product.id,
                nut_count=prod_data["nut_count"],
                moisture_content="8-10%",
                out_turn="48-52 lbs",
                defective_percentage="<5%"
            )
            
            db.add(spec)
            print(f"✓ Added: {product.name} from Benin")
        
        db.commit()
        
        new_benin_count = db.query(Product).filter(
            Product.origin == "Benin",
            Product.status == "active"
        ).count()
        print(f"✓ Benin products now: {new_benin_count}")
    else:
        print(f"✓ Benin already has {benin_count} products")
    
    print("\n" + "="*80)
    print("DATABASE FIXES COMPLETED!")
    print("="*80)
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    db.rollback()
finally:
    db.close()
