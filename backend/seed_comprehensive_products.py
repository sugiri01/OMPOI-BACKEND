"""
Comprehensive product seeding script to test all filters
Creates products with diverse:
- Origins (Vietnam, India, Brazil, Ghana, Tanzania, Benin, Cote d'Ivoire)
- Certifications (Organic, Fair Trade, RBS Certified)
- Nut Counts (160-180/kg, 185-195/kg, 190/kg)
- Ratings (3.5 to 5.0)
- Primo status (True/False)
"""

from app.core.database import SessionLocal
from app.products.models import Product, ProductSpecification
from app.users.models import User
from decimal import Decimal
import uuid

db = SessionLocal()

try:
    # Get existing sellers
    sellers = db.query(User).filter(User.role == 'seller').all()
    if not sellers:
        print("No sellers found. Please run seed_data.py first to create sellers.")
        exit(1)
    
    print(f"Found {len(sellers)} sellers")
    
    # Comprehensive product data
    products_data = [
        # Vietnam products
        {"name": "RCN W320", "origin": "Vietnam", "nut_count": "160-180/kg", "certs": ["Organic"], "rating": 4.8, "primo": True, "price": 2.85},
        {"name": "RCN W240", "origin": "Vietnam", "nut_count": "185-195/kg", "certs": ["Fair Trade"], "rating": 4.5, "primo": False, "price": 2.65},
        
        # India products
        {"name": "RCN W320", "origin": "India", "nut_count": "160-180/kg", "certs": ["RBS Certified"], "rating": 4.7, "primo": True, "price": 2.75},
        {"name": "RCN W180", "origin": "India", "nut_count": "190/kg", "certs": ["Organic", "Fair Trade"], "rating": 4.9, "primo": True, "price": 3.10},
        {"name": "RCN W240", "origin": "India", "nut_count": "185-195/kg", "certs": [], "rating": 4.2, "primo": False, "price": 2.50},
        
        # Brazil products
        {"name": "RCN W320", "origin": "Brazil", "nut_count": "160-180/kg", "certs": ["Organic"], "rating": 4.6, "primo": True, "price": 2.90},
        {"name": "RCN W240", "origin": "Brazil", "nut_count": "185-195/kg", "certs": ["RBS Certified"], "rating": 4.3, "primo": False, "price": 2.60},
        
        # Ghana products
        {"name": "RCN W320", "origin": "Ghana", "nut_count": "160-180/kg", "certs": ["Fair Trade"], "rating": 4.4, "primo": False, "price": 2.70},
        {"name": "RCN W180", "origin": "Ghana", "nut_count": "190/kg", "certs": ["Organic", "RBS Certified"], "rating": 4.8, "primo": True, "price": 3.05},
        
        # Tanzania products
        {"name": "RCN W320", "origin": "Tanzania", "nut_count": "160-180/kg", "certs": ["Organic"], "rating": 4.5, "primo": False, "price": 2.65},
        {"name": "RCN W240", "origin": "Tanzania", "nut_count": "185-195/kg", "certs": [], "rating": 4.0, "primo": False, "price": 2.45},
        
        # Benin products
        {"name": "RCN W320", "origin": "Benin", "nut_count": "160-180/kg", "certs": ["Fair Trade", "RBS Certified"], "rating": 4.7, "primo": True, "price": 2.80},
        {"name": "RCN W180", "origin": "Benin", "nut_count": "190/kg", "certs": ["Organic"], "rating": 4.9, "primo": True, "price": 3.15},
        
        # Cote d'Ivoire products
        {"name": "RCN W320", "origin": "Cote d'Ivoire", "nut_count": "160-180/kg", "certs": ["RBS Certified"], "rating": 4.6, "primo": True, "price": 2.75},
        {"name": "RCN W240", "origin": "Cote d'Ivoire", "nut_count": "185-195/kg", "certs": ["Fair Trade"], "rating": 4.3, "primo": False, "price": 2.55},
        
        # Additional variety for testing
        {"name": "RCN W450", "origin": "Vietnam", "nut_count": "190/kg", "certs": [], "rating": 3.8, "primo": False, "price": 2.30},
        {"name": "RCN W450", "origin": "India", "nut_count": "190/kg", "certs": ["Organic"], "rating": 4.1, "primo": False, "price": 2.40},
    ]
    
    created_count = 0
    for idx, prod_data in enumerate(products_data):
        seller = sellers[idx % len(sellers)]
        
        # Check if product already exists
        existing = db.query(Product).filter(
            Product.name == prod_data["name"],
            Product.origin == prod_data["origin"],
            Product.seller_id == seller.id
        ).first()
        
        if existing:
            print(f"Skipping existing: {prod_data['name']} from {prod_data['origin']}")
            continue
        
        # Create product
        product = Product(
            id=uuid.uuid4(),
            seller_id=seller.id,
            name=prod_data["name"],
            origin=prod_data["origin"],
            price_per_kg=Decimal(str(prod_data["price"])),
            currency="USD",
            status="active",
            rating=Decimal(str(prod_data["rating"])),
            review_count=int(prod_data["rating"] * 50),  # Simulate reviews
            is_primo=prod_data["primo"],
            stock_location="Tuticorin Stock" if prod_data["primo"] else "Standard Warehouse",
            lead_time="7-10 days" if prod_data["primo"] else "14-21 days",
            certifications=prod_data["certs"],
            category="Raw Cashew Nuts",
            grade="Premium" if prod_data["rating"] >= 4.5 else "Standard",
            description=f"High quality {prod_data['name']} from {prod_data['origin']}"
        )
        
        db.add(product)
        db.flush()
        
        # Create specification
        spec = ProductSpecification(
            id=uuid.uuid4(),
            product_id=product.id,
            nut_count=prod_data["nut_count"],
            moisture_content="8-10%",
            out_turn="48-52 lbs",
            defective_percentage="<5%"
        )
        
        db.add(spec)
        created_count += 1
        print(f"✓ Created: {product.name} from {product.origin} (Primo: {product.is_primo}, Rating: {product.rating})")
    
    db.commit()
    print(f"\n{'='*60}")
    print(f"Successfully created {created_count} new products!")
    print(f"Total products in DB: {db.query(Product).count()}")
    print(f"{'='*60}")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    db.rollback()
finally:
    db.close()
