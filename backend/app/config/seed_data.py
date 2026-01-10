"""
Seed data script for configuration tables.
Run this after applying migrations to populate initial configuration data.
"""
from datetime import datetime, timedelta
from decimal import Decimal
from app.core.database import SessionLocal
from app.config.models import Offer, FeaturedSupplier, SystemConfig, Country
from app.users.models import User, UserProfile
from app.products.models import Product, ProductSpecification
from app.core.security import get_password_hash


def seed_offers():
    """Seed promotional offers."""
    db = SessionLocal()
    try:
        offers = [
            Offer(
                code="HARVEST50",
                title="Save up to $500 on bulk orders",
                description="Special discount for bulk RCN orders during harvest season",
                discount_type="fixed",
                discount_value=Decimal("500.00"),
                min_order_value=Decimal("5000.00"),
                product_type="RCN",
                valid_from=datetime.utcnow(),
                valid_until=datetime.utcnow() + timedelta(days=30),
                is_active=True,
                usage_limit=100
            ),
            Offer(
                code="CASH200",
                title="Flat $200 discount",
                description="Instant discount on all RCN orders",
                discount_type="fixed",
                discount_value=Decimal("200.00"),
                min_order_value=Decimal("2000.00"),
                product_type="RCN",
                valid_from=datetime.utcnow(),
                valid_until=datetime.utcnow() + timedelta(days=60),
                is_active=True
            ),
            Offer(
                code="FIRST",
                title="Save $350 on first order",
                description="Welcome offer for new buyers",
                discount_type="fixed",
                discount_value=Decimal("350.00"),
                min_order_value=Decimal("3000.00"),
                product_type=None,
                valid_from=datetime.utcnow(),
                valid_until=datetime.utcnow() + timedelta(days=90),
                is_active=True,
                usage_limit=1
            ),
            Offer(
                code="BULKDEAL",
                title="Special rates for bulk buyers",
                description="Premium pricing for bulk orders",
                discount_type="percentage",
                discount_value=Decimal("10.00"),
                min_order_value=Decimal("10000.00"),
                max_discount=Decimal("1000.00"),
                product_type=None,
                valid_from=datetime.utcnow(),
                valid_until=datetime.utcnow() + timedelta(days=120),
                is_active=True
            ),
        ]
        
        for offer in offers:
            existing = db.query(Offer).filter(Offer.code == offer.code).first()
            if not existing:
                db.add(offer)
        
        db.commit()
        print(f"✓ Seeded {len(offers)} offers")
    except Exception as e:
        print(f"✗ Error seeding offers: {e}")
        db.rollback()
    finally:
        db.close()


def seed_featured_suppliers():
    """Seed featured suppliers."""
    db = SessionLocal()
    try:
        suppliers = [
            FeaturedSupplier(
                name="OMPOI Cashew Exports",
                origin="Benin",
                stock_location="Tuticorin Stock",
                quality_badge="Premium",
                rating=Decimal("4.8"),
                review_count=245,
                is_active=True,
                display_order=1
            ),
            FeaturedSupplier(
                name="Global Traders",
                origin="Ghana",
                stock_location="Mumbai Stock",
                quality_badge="Verified",
                rating=Decimal("4.3"),
                review_count=189,
                is_active=True,
                display_order=2
            ),
            FeaturedSupplier(
                name="Kerala Premium",
                origin="Côte d'Ivoire",
                stock_location="Kochi Stock",
                quality_badge="Certified",
                rating=Decimal("4.6"),
                review_count=156,
                is_active=True,
                display_order=3
            ),
            FeaturedSupplier(
                name="Tanzania Suppliers",
                origin="Tanzania",
                stock_location="Chennai Stock",
                quality_badge="Premium",
                rating=Decimal("4.5"),
                review_count=134,
                is_active=True,
                display_order=4
            ),
        ]
        
        for supplier in suppliers:
            existing = db.query(FeaturedSupplier).filter(
                FeaturedSupplier.name == supplier.name
            ).first()
            if not existing:
                db.add(supplier)
        
        db.commit()
        print(f"✓ Seeded {len(suppliers)} featured suppliers")
    except Exception as e:
        print(f"✗ Error seeding suppliers: {e}")
        db.rollback()
    finally:
        db.close()


def seed_countries():
    """Seed countries list."""
    db = SessionLocal()
    try:
        countries = [
            Country(name="India", code="IN", region="Asia", currency_code="INR", phone_code="+91", display_order=1),
            Country(name="United States", code="US", region="North America", currency_code="USD", phone_code="+1", display_order=2),
            Country(name="United Kingdom", code="GB", region="Europe", currency_code="GBP", phone_code="+44", display_order=3),
            Country(name="Australia", code="AU", region="Oceania", currency_code="AUD", phone_code="+61", display_order=4),
            Country(name="Singapore", code="SG", region="Asia", currency_code="SGD", phone_code="+65", display_order=5),
            Country(name="United Arab Emirates", code="AE", region="Middle East", currency_code="AED", phone_code="+971", display_order=6),
            Country(name="Japan", code="JP", region="Asia", currency_code="JPY", phone_code="+81", display_order=7),
            Country(name="China", code="CN", region="Asia", currency_code="CNY", phone_code="+86", display_order=8),
            Country(name="Germany", code="DE", region="Europe", currency_code="EUR", phone_code="+49", display_order=9),
            Country(name="France", code="FR", region="Europe", currency_code="EUR", phone_code="+33", display_order=10),
            Country(name="Canada", code="CA", region="North America", currency_code="CAD", phone_code="+1", display_order=11),
            Country(name="Brazil", code="BR", region="South America", currency_code="BRL", phone_code="+55", display_order=12),
            Country(name="South Africa", code="ZA", region="Africa", currency_code="ZAR", phone_code="+27", display_order=13),
            Country(name="Others", code="XX", region="Global", display_order=99, supports_registration=False, supports_shipping=False),
        ]
        
        for country in countries:
            existing = db.query(Country).filter(Country.code == country.code).first()
            if not existing:
                db.add(country)
        
        db.commit()
        print(f"✓ Seeded {len(countries)} countries")
    except Exception as e:
        print(f"✗ Error seeding countries: {e}")
        db.rollback()
    finally:
        db.close()


def seed_system_config():
    """Seed system configuration."""
    db = SessionLocal()
    try:
        configs = [
            SystemConfig(
                key="platform_tagline",
                value="India's No.1 online agri marketplace platform",
                value_type="string",
                category="ui",
                description="Main platform tagline displayed on landing page",
                is_public=True
            ),
            SystemConfig(
                key="active_suppliers_count",
                value="150",
                value_type="number",
                category="stats",
                description="Number of active suppliers",
                is_public=True
            ),
            SystemConfig(
                key="countries_covered",
                value="12",
                value_type="number",
                category="stats",
                description="Number of countries covered",
                is_public=True
            ),
            SystemConfig(
                key="mt_sourced_yearly",
                value="50000",
                value_type="number",
                category="stats",
                description="Metric tons sourced yearly",
                is_public=True
            ),
        ]
        
        for config in configs:
            existing = db.query(SystemConfig).filter(SystemConfig.key == config.key).first()
            if not existing:
                db.add(config)
        
        db.commit()
        print(f"✓ Seeded {len(configs)} system configurations")
    except Exception as e:
        print(f"✗ Error seeding system config: {e}")
        db.rollback()
    finally:
        db.close()

def seed_users():
    """Seed seller users."""
    db = SessionLocal()
    try:
        sellers = [
            {
                "email": "global@ompoi.com",
                "company_name": "Global Cashew Traders",
                "phone": "+84123456789",
                "origin": "Vietnam"
            },
            {
                "email": "spice@ompoi.com",
                "company_name": "Spice Cashew Exports",
                "phone": "+919876543210",
                "origin": "India"
            },
            {
                "email": "amazon@ompoi.com",
                "company_name": "Amazon Nut Suppliers",
                "phone": "+551198765432",
                "origin": "Brazil"
            },
            {
                "email": "nutri@ompoi.com",
                "company_name": "NutriFoods Inc.",
                "phone": "+12025550123",
                "origin": "USA"
            },
            {
                "email": "exports@ompoi.com",
                "company_name": "OMPOI Cashew Exports.",
                "phone": "+233241234567",
                "origin": "Ghana"
            }
        ]
        
        count = 0
        for seller in sellers:
            existing = db.query(User).filter(User.email == seller["email"]).first()
            if not existing:
                user = User(
                    email=seller["email"],
                    password_hash=get_password_hash("password123"),
                    role="seller",
                    status="active",
                    email_verified=True,
                    phone=seller["phone"]
                )
                db.add(user)
                db.commit()
                db.refresh(user)
                
                profile = UserProfile(
                    user_id=user.id,
                    company_name=seller["company_name"],
                    business_type="Exporter",
                    address={"country": seller["origin"]}
                )
                db.add(profile)
                count += 1
        
        db.commit()
        print(f"✓ Seeded {count} users")
    except Exception as e:
        print(f"✗ Error seeding users: {e}")
        db.rollback()
    finally:
        db.close()

def seed_products():
    """Seed products based on screenshot."""
    db = SessionLocal()
    try:
        products_data = [
            {
                "email": "global@ompoi.com",
                "name": "RCN W320",
                "origin": "Vietnam",
                "is_primo": True,
                "rating": 4.8,
                "review_count": 245,
                "price_per_kg": 7.80,
                "stock_location": "Tuticorin Stock",
                "lead_time": "15 days",
                "certifications": ["RBS Certified"],
                "nut_count": "190", 
                 # Screenshot shows "190/kg * 49 LBS". Nut count is usually 190.
                "quantity": 1000
            },
             {
                "email": "spice@ompoi.com",
                "name": "RCN W320",
                "origin": "India",
                "is_primo": True,
                "rating": 4.8,
                "review_count": 245,
                "price_per_kg": 7.80,
                "stock_location": "Tuticorin Stock",
                "lead_time": "15 days",
                "certifications": ["RBS Certified"],
                "nut_count": "190", 
                "quantity": 500
            },
             {
                "email": "amazon@ompoi.com",
                "name": "RCN W320",
                "origin": "Brazil",
                "is_primo": True,
                "rating": 4.8,
                "review_count": 245,
                "price_per_kg": 7.80,
                "stock_location": "Tuticorin Stock",
                "lead_time": "15 days",
                "certifications": ["RBS Certified"],
                "nut_count": "190", 
                "quantity": 750
            },
             {
                "email": "nutri@ompoi.com",
                "name": "RCN W320",
                "origin": "USA",
                "is_primo": True,
                "rating": 4.8,
                "review_count": 245,
                "price_per_kg": 7.80,
                "stock_location": "Tuticorin Stock",
                "lead_time": "15 days",
                "certifications": ["RBS Certified"],
                "nut_count": "190", 
                "quantity": 200
            },
             {
                "email": "exports@ompoi.com",
                "name": "RCN W320",
                "origin": "Ghana",
                "is_primo": True,
                "rating": 4.8,
                "review_count": 245,
                "price_per_kg": 7.80,
                "stock_location": "Tuticorin Stock",
                "lead_time": "15 days",
                "certifications": ["RBS Certified"],
                "nut_count": "190", 
                "quantity": 150
            },
        ]
        
        count = 0
        for p_data in products_data:
            # Find seller
            seller = db.query(User).filter(User.email == p_data["email"]).first()
            if not seller:
                print(f"Skipping product for {p_data['email']} - User not found")
                continue
                
            # Check if product exists for this seller
            existing = db.query(Product).filter(
                Product.seller_id == seller.id,
                Product.name == p_data["name"]
            ).first()
            
            if not existing:
                product = Product(
                    seller_id=seller.id,
                    name=p_data["name"],
                    origin=p_data["origin"],
                    price_per_kg=p_data["price_per_kg"],
                    currency="USD",
                    status="active",
                    is_primo=p_data["is_primo"],
                    rating=p_data["rating"],
                    review_count=p_data["review_count"],
                    stock_location=p_data["stock_location"],
                    lead_time=p_data["lead_time"],
                    certifications=p_data["certifications"],
                    specifications_json={"quantity": p_data["quantity"]} # Use JSON for extra data not in columns
                )
                db.add(product)
                db.commit()
                db.refresh(product)
                
                # Create spec
                spec = ProductSpecification(
                    product_id=product.id,
                    nut_count=p_data["nut_count"]
                )
                db.add(spec)
                count += 1
                
        db.commit()
        print(f"✓ Seeded {count} products")
    except Exception as e:
        print(f"✗ Error seeding products: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    print("Starting configuration data seeding...")
    seed_offers()
    seed_featured_suppliers()
    seed_countries()
    seed_system_config()
    seed_users()
    seed_products()
    print("\n✓ Configuration seeding completed!")
