from app.core.database import SessionLocal
from app.users.models import User
from app.products.service import get_products
import traceback

db = SessionLocal()
try:
    print("Calling get_products with status='active'...")
    products = get_products(db, status='active')
    print(f"Success! Found {len(products)} products")
    for p in products:
        print(f" - {p.name} ({p.origin})")
except Exception as e:
    with open("traceback_log.txt", "w", encoding="utf-8") as f:
        f.write("FULL ERROR TRACEBACK:\n")
        traceback.print_exc(file=f)
    traceback.print_exc()
finally:
    db.close()
