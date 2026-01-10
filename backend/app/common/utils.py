import re
from datetime import datetime
from uuid import UUID

def generate_order_number() -> str:
    """Generate unique order number: OMP-YYYYMMDD-XXXX"""
    from random import randint
    date_str = datetime.utcnow().strftime("%Y%m%d")
    random_suffix = randint(1000, 9999)
    return f"OMP-{date_str}-{random_suffix}"

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone: str) -> bool:
    """Validate international phone format"""
    pattern = r'^\+?[1-9]\d{1,14}$'
    return re.match(pattern, phone) is not None

def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe storage"""
    return re.sub(r'[^\w\-_\. ]', '_', filename)

def format_currency(amount: float, currency: str = "USD") -> str:
    """Format currency for display"""
    return f"{currency} {amount:,.2f}"

def is_valid_uuid(uuid_string: str) -> bool:
    """Check if string is valid UUID"""
    try:
        UUID(uuid_string)
        return True
    except ValueError:
        return False
