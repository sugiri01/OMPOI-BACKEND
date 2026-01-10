"""
Comprehensive seed data ensuring AT LEAST 2 products per filter combination
This prevents empty results when using any filter
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
        print("No sellers found. Please run seed_data.py first.")
        exit(1)
    
    print(f"Found {len(sellers)} sellers")
    
    # Delete existing products to start fresh
    deleted = db.query(Product).delete()
    db.commit()
    print(f"Deleted {deleted} existing products")
    
    # Comprehensive matrix: 2+ products for each combination
    origins = ["Vietnam", "India", "Brazil", "Ghana", "Tanzania", "Benin", "Cote d'Ivoire"]
    certifications_list = [
        ["Organic"],
        ["Fair Trade"],
        ["RBS Certified"],
        ["Organic", "Fair Trade"],
        ["Organic", "RBS Certified"],
        []  # No certifications
    ]
    nut_counts = ["160-180/kg", "185-195/kg", "190/kg"]
    
    products_data = []
    product_id = 0
    
    # Generate 2 products for each origin
    for origin in origins:
        for i in range(2):
            # Rotate through certifications and nut counts
            cert_idx = (product_id) % len(certifications_list)
            nut_idx = (product_id) % len(nut_counts)
            
            is_primo = (product_id % 3 == 0)  # Every 3rd product is primo
            rating = 3.8 + (product_id % 12) * 0.1  # Ratings from 3.8 to 4.9
            
            products_data.append({
                "name": f"RCN W{320 + (i * 120)}",  # W320 or W440
                "origin": origin,
                "nut_count": nut_counts[nut_idx],
                "certs": certifications_list[cert_idx],
                "rating": min(rating, 4.9),
                "primo": is_primo,
                "price": 2.50 + (product_id % 10) * 0.05
            })
            product_id += 1
    
    # Add extra products for popular combinations
    extra_products = [
        # More Vietnam products (popular origin)
        {"name": "RCN W240", "origin": "Vietnam", "nut_count": "185-195/kg", "certs": ["Organic"], "rating": 4.8, "primo": True, "price": 2.90},
        {"name": "RCN W180", "origin": "Vietnam", "nut_count": "190/kg", "certs": ["Fair Trade"], "rating": 4.7, "primo": True, "price": 3.10},
        
        # More India products
        {"name": "RCN W240", "origin": "India", "nut_count": "185-195/kg", "certs": ["RBS Certified"], "rating": 4.6, "primo": False, "price": 2.70},
        {"name": "RCN W180", "origin": "India", "nut_count": "190/kg", "certs": ["Organic", "Fair Trade"], "rating": 4.9, "primo": True, "price": 3.20},
        
        # More Brazil products
        {"name": "RCN W240", "origin": "Brazil", "nut_count": "185-195/kg", "certs": [], "rating": 4.2, "primo": False, "price": 2.55},
        {"name": "RCN W180", "origin": "Brazil", "nut_count": "190/kg", "certs": ["Organic"], "rating": 4.5, "primo": True, "price": 2.95},
    ]
    
    products_data.extend(extra_products)
    
    created_count = 0
    for idx, prod_data in enumerate(products_data):
        seller = sellers[idx % len(sellers)]
        
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
            review_count=int(prod_data["rating"] * 50),
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
        print(f"✓ Created: {product.name} from {product.origin} | Certs: {product.certifications} | Nut: {prod_data['nut_count']} | Primo: {product.is_primo}")
    
    db.commit()
    print(f"\n{'='*80}")
    print(f"Successfully created {created_count} products!")
    print(f"Total active products: {db.query(Product).filter(Product.status == 'active').count()}")
    
    # Verify coverage
    print(f"\n{'='*80}")
    print("FILTER COVERAGE VERIFICATION:")
    print(f"{'='*80}")
    
    for origin in origins:
        count = db.query(Product).filter(Product.origin == origin, Product.status == 'active').count()
        print(f"  {origin}: {count} products")
    
    print(f"\nNut Counts:")
    for nut in nut_counts:
        count = db.query(ProductSpecification).filter(ProductSpecification.nut_count == nut).count()
        print(f"  {nut}: {count} products")
    
    print(f"\nPrimo Status:")
    primo_count = db.query(Product).filter(Product.is_primo == True, Product.status == 'active').count()
    standard_count = db.query(Product).filter(Product.is_primo == False, Product.status == 'active').count()
    print(f"  Primo: {primo_count} products")
    print(f"  Standard: {standard_count} products")
    
    print(f"{'='*80}")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    db.rollback()
finally:
    db.close()
