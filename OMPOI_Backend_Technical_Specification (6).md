# OMPOI Backend Technical Specification (Modular Monolith)

## 1. Executive Summary

### 1.1 Project Overview
OMPOI is an agricultural commodity marketplace platform connecting buyers, sellers, and quality control agents for trading raw agricultural products (primarily cashew nuts). The backend will support four distinct user interfaces: Buyer, Seller, Agent, and Admin.

### 1.2 Technology Stack - Phase NOW (v1)
- **Framework**: FastAPI (Python 3.11+)
- **Architecture**: **Modular Monolith** (microservice-ready, not microservices yet)
- **Database**: NeonDB (PostgreSQL) - Single schema
- **Authentication**: JWT (FastAPI + PyJWT)
- **AI Integration**: OpenRouter API (shared client)
- **Containerization**: Docker (single backend container)
- **Hosting**: VPS / Simple VM (Hostinger / AWS EC2)
- **Logging**: Stdout (JSON format)

### 1.3 Explicitly NOT Used Now (Phase LATER)
❌ Separate microservices per domain (user-service, product-service, etc.)  
❌ API Gateway (Kong/Traefik)  
❌ Message Queue (RabbitMQ/Redis Pub/Sub)  
❌ Kubernetes / Container orchestration  
❌ Prometheus + Grafana monitoring stack  
❌ Separate Analytics/Inventory/Payment services as independent deployables  
❌ Service mesh / Complex networking  

**Why Modular Monolith?**
- Faster development and deployment
- Easier debugging and testing
- Lower infrastructure costs
- Microservice-ready architecture (can split later without rewrite)
- Perfect for MVP and early growth phase

---

## 2. CRITICAL FIXES APPLIED ✅

Before starting development, the following 5 critical issues have been addressed:

### ✅ Fix #1: Added `common/` Utilities Layer
**Problem**: Modules would duplicate code for exceptions, responses, email, AI client  
**Solution**: Created `/app/common/` with:
- `exceptions.py` - Custom exception classes
- `responses.py` - Standard API response formats
- `utils.py` - Helper functions (order number generation, validation, etc.)
- `email_client.py` - Shared SMTP email utilities
- `ai_client.py` - Shared OpenRouter client with rate limiting

**Impact**: Prevents code duplication, ensures consistency across modules

---

### ✅ Fix #2: Complete CORS Configuration
**Problem**: CORS only configured for production, would break in dev/staging  
**Solution**: Added support for:
- ✅ Production: `buyer.ompoi.com`, `seller.ompoi.com`, `agent.ompoi.com`, `admin.ompoi.com`
- ✅ Staging: `*-staging.ompoi.com` subdomains
- ✅ Next.js dev: `localhost:3000-3003`
- ✅ Vite dev: `localhost:5173-5176`
- ✅ Environment-specific configuration

**Impact**: Frontend will work in all environments without CORS errors

---

### ✅ Fix #3: Added `broker_id` to Orders Table
**Problem**: Can't differentiate buyer-created, seller-created, or broker-facilitated orders  
**Solution**: Added to `orders` table:
- `broker_id UUID` - References agent/broker who facilitated the order (nullable)
- `order_source VARCHAR(20)` - Tracks origin: 'buyer_created', 'seller_created', 'broker_facilitated'
- Index on `broker_id` for performance

**Impact**: Proper workflow tracking for agent-facilitated trades, essential for OMPOI's business model

---

### ✅ Fix #4: AI Rate Limiting Protection
**Problem**: No limits on AI calls → one misclick could cost ₹3,000+  
**Solution**: Implemented rate limiting:
- **Global**: Max 20 AI calls per minute (system-wide)
- **Per-user**: Max 200 AI calls per day
- Automatic rate limit checking before each AI call
- User-friendly error messages
- Usage stats returned with each response

**Impact**: Cost protection, prevents AI bill explosion

---

### ✅ Fix #5: Activity Logs Module
**Problem**: No audit trail for disputes, compliance, or fraud detection  
**Solution**: Added `/app/activity/` module with:
- `activity_logs` table tracking all major actions
- Logs: login, product created, order placed, QC updates, AI usage
- Includes: user_id, action, module, metadata, IP address, user agent
- Admin-only endpoints to search/view logs

**Impact**: Essential for:
- Dispute resolution
- UEF compliance
- Export regulations
- Security auditing
- Fraud detection

---

## 3. System Architecture - Modular Monolith

### 2.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Client Applications                    │
│         (Buyer, Seller, Agent, Admin - Next.js)         │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS/JWT
                        ▼
        ┌───────────────────────────────┐
        │   Single FastAPI Application  │
        │    (Modular Monolith)         │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/users/             │ │
        │  │  - router.py            │ │
        │  │  - models.py            │ │
        │  │  - service.py           │ │
        │  └─────────────────────────┘ │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/products/          │ │
        │  │  - router.py            │ │
        │  │  - models.py            │ │
        │  │  - service.py           │ │
        │  └─────────────────────────┘ │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/orders/            │ │
        │  │  - router.py            │ │
        │  │  - models.py            │ │
        │  │  - service.py           │ │
        │  └─────────────────────────┘ │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/qc/                │ │
        │  │  - router.py            │ │
        │  │  - models.py            │ │
        │  │  - service.py           │ │
        │  └─────────────────────────┘ │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/ai/                │ │
        │  │  - router.py            │ │
        │  │  - client.py            │ │
        │  └─────────────────────────┘ │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/notifications/     │ │
        │  │  - router.py            │ │
        │  │  - service.py           │ │
        │  └─────────────────────────┘ │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/admin/             │ │
        │  │  - router.py            │ │
        │  │  - analytics.py         │ │
        │  └─────────────────────────┘ │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │  app/core/              │ │
        │  │  - config.py            │ │
        │  │  - security.py          │ │
        │  │  - database.py          │ │
        │  └─────────────────────────┘ │
        └───────────────┬───────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │      NeonDB (PostgreSQL)       │
        │      Single Schema Design      │
        └───────────────────────────────┘
```

### 2.2 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app entry point
│   │
│   ├── core/                      # Shared infrastructure
│   │   ├── __init__.py
│   │   ├── config.py              # Settings & environment
│   │   ├── security.py            # JWT, password hashing
│   │   └── database.py            # DB session, engine
│   │
│   ├── common/                    # CRITICAL: Shared utilities
│   │   ├── __init__.py
│   │   ├── exceptions.py          # Custom exceptions
│   │   ├── responses.py           # Standard API responses
│   │   ├── utils.py               # Helper functions
│   │   ├── email_client.py        # SMTP/email utilities
│   │   └── ai_client.py           # OpenRouter client (shared)
│   │
│   ├── db/                        # Database utilities
│   │   ├── __init__.py
│   │   ├── base.py                # SQLAlchemy Base
│   │   └── session.py             # Session dependency
│   │
│   ├── users/                     # User & Auth Module
│   │   ├── __init__.py
│   │   ├── router.py              # API endpoints
│   │   ├── models.py              # SQLAlchemy models
│   │   ├── schemas.py             # Pydantic schemas
│   │   ├── service.py             # Business logic
│   │   └── deps.py                # Dependencies
│   │
│   ├── products/                  # Product Catalog Module
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── orders/                    # Order Management Module
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── qc/                        # Quality Control Module
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── ai/                        # AI Services Module
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── client.py              # OpenRouter client
│   │   └── schemas.py
│   │
│   ├── notifications/             # Notification Module
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── service.py             # Email/SMS sending
│   │   └── schemas.py
│   │
│   ├── admin/                     # Admin & Analytics Module
│       ├── __init__.py
│       ├── router.py
│       ├── analytics.py           # Simple analytics queries
│       └── schemas.py
│   │
│   └── activity/                  # CRITICAL: Activity Logs Module
│       ├── __init__.py
│       ├── router.py              # Internal endpoints only
│       ├── models.py              # Activity log model
│       └── service.py             # Logging service
│
├── alembic/                       # Database migrations
│   ├── versions/
│   ├── env.py
│   └── alembic.ini
│
├── tests/                         # Test suite
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_users.py
│   ├── test_products.py
│   ├── test_orders.py
│   └── test_ai.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md
```

### 2.3 Module Responsibilities

#### Core Modules (Must-Have for v1)

**1. Users Module (app/users/)**
- User registration and authentication
- JWT token generation and validation
- User profile management
- Role-based access control (buyer, seller, agent, admin)
- Password hashing and verification

**2. Products Module (app/products/)**
- Product listing creation and management
- Product catalog with search and filtering
- Product specifications (nut count, moisture, etc.)
- Image upload and management
- Category and grade management

**3. Orders Module (app/orders/)**
- Order creation and lifecycle management
- Order status tracking
- Order timeline/history
- Buyer and seller order views
- Contract URL storage
- Payment terms recording (no payment gateway integration yet)

**4. QC Module (app/qc/)**
- Quality inspection scheduling
- QC report generation
- Inspection approval/rejection workflow
- Sample testing results
- Agent assignment to inspections

**5. AI Module (app/ai/)**
- Product description generation (OpenRouter)
- Market price prediction
- Quality analysis from images
- Contract term review
- Market insights generation

**6. Notifications Module (app/notifications/)**
- Email notifications (SMTP/SendGrid)
- Simple notification sending
- Order updates
- QC status updates
- Basic notification log

**7. Admin Module (app/admin/)**
- Simple dashboard queries
- User management
- Order statistics
- Product analytics
- Live SQL-based reporting (no separate analytics service)

### 2.4 Microservice-Ready Design Principles

To ensure easy migration to microservices later:

**Rule 1: No Cross-Module Business Logic Imports**
```python
# ❌ BAD - Direct import across modules
from app.products.service import ProductService

# ✅ GOOD - Use database queries or API-style interfaces
from app.db.session import get_db
product = db.query(Product).filter_by(id=product_id).first()
```

**Rule 2: Each Module Owns Its Tables**
- `users/` owns: `users`, `user_profiles`
- `products/` owns: `products`, `product_specifications`
- `orders/` owns: `orders`, `order_items`, `order_timeline`
- `qc/` owns: `qc_inspections`, `qc_reports`

**Rule 3: Clear API Boundaries**
```python
# Each module exposes its own router
users_router = APIRouter(prefix="/api/v1/users", tags=["users"])
products_router = APIRouter(prefix="/api/v1/products", tags=["products"])
orders_router = APIRouter(prefix="/api/v1/orders", tags=["orders"])
```

**Rule 4: Shared Infrastructure in core/**
- Configuration
- Security (JWT, password hashing)
- Database connection
- Logging utilities

**Future Migration Path:**
When traffic grows and you need microservices:
1. Copy `app/orders/` into a new `orders-service` repo
2. Add its own `main.py` and `core/` setup
3. Replace database joins with HTTP calls or events
4. Add API gateway (Kong/Traefik)
5. No rewrite of business logic needed!
---

## 3. API Endpoints - Modular Monolith

All endpoints are served from a single FastAPI application on **port 8000**.

### 3.1 Users & Authentication Module

**Base Path**: `/api/v1`

```python
# app/users/router.py
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1", tags=["users", "auth"])
```

**Endpoints**:
```
POST   /api/v1/auth/register         # User registration
POST   /api/v1/auth/login            # User login (returns JWT)
POST   /api/v1/auth/refresh          # Refresh access token
GET    /api/v1/users/profile         # Get current user profile
PUT    /api/v1/users/profile         # Update current user profile
GET    /api/v1/users/{user_id}       # Get user by ID (admin only)
PUT    /api/v1/users/{user_id}/role  # Update user role (admin only)
DELETE /api/v1/users/{user_id}       # Delete user (admin only)
```

**Database Schema**:
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('buyer', 'seller', 'agent', 'admin')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'locked', 'pending')),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255),
    business_type VARCHAR(100),
    address JSONB,
    documents JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 3.2 Products Module

**Base Path**: `/api/v1/products`

**Endpoints**:
```
POST   /api/v1/products                    # Create new product listing
GET    /api/v1/products                    # List all products (with pagination)
GET    /api/v1/products/{product_id}       # Get product details
PUT    /api/v1/products/{product_id}       # Update product
DELETE /api/v1/products/{product_id}       # Delete product (seller only)
GET    /api/v1/products/search?q={query}   # Search products
GET    /api/v1/products/categories         # Get product categories
GET    /api/v1/products/supplier/{seller_id} # Get products by seller
POST   /api/v1/products/{product_id}/images  # Upload product images
```

**Database Schema**:
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    grade VARCHAR(50),
    origin VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    specifications JSONB NOT NULL,
    price_per_kg DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    packaging VARCHAR(100),
    certifications JSONB,
    images JSONB,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    nut_count VARCHAR(50),
    moisture_content VARCHAR(20),
    out_turn VARCHAR(20),
    defective_percentage VARCHAR(20),
    quality_parameters JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_origin ON products(origin);
```

### 3.3 Orders Module

**Base Path**: `/api/v1/orders`

**Endpoints**:
```
POST   /api/v1/orders                      # Create new order
GET    /api/v1/orders                      # List orders (filtered by role)
GET    /api/v1/orders/{order_id}           # Get order details
PUT    /api/v1/orders/{order_id}/status    # Update order status
GET    /api/v1/orders/buyer/{buyer_id}     # Get buyer's orders
GET    /api/v1/orders/seller/{seller_id}   # Get seller's orders
POST   /api/v1/orders/{order_id}/cancel    # Cancel order
GET    /api/v1/orders/{order_id}/timeline  # Get order timeline
POST   /api/v1/orders/{order_id}/contract  # Upload contract document
```

**Database Schema**:
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    seller_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    broker_id UUID REFERENCES users(id) ON DELETE SET NULL,  -- CRITICAL: Agent/broker facilitation
    product_id UUID REFERENCES products(id) ON DELETE RESTRICT,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'MT',
    price_per_kg DECIMAL(10, 2) NOT NULL,
    total_value DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(30) DEFAULT 'new' CHECK (status IN 
        ('new', 'processing', 'qc_pending', 'qc_approved', 'qc_rejected', 
         'payment_pending', 'payment_completed', 'shipped', 'delivered', 'cancelled')),
    order_source VARCHAR(20) CHECK (order_source IN ('buyer_created', 'seller_created', 'broker_facilitated')),  -- CRITICAL: Track order origin
    payment_terms JSONB,              -- Store payment info as JSON (no PG integration yet)
    delivery_terms JSONB,
    contract_url VARCHAR(500),
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255),
    grade VARCHAR(50),
    origin VARCHAR(100),
    packaging VARCHAR(100),
    quantity DECIMAL(10, 2) NOT NULL,
    price_per_kg DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL
);

CREATE TABLE order_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_seller ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
```

---

## 3.8 Common Utilities Module (CRITICAL)

**Base Path**: `/app/common`

This module prevents code duplication across all other modules.

**Files**:

### 3.8.1 Custom Exceptions
```python
# app/common/exceptions.py
from fastapi import HTTPException, status

class OMPOIException(Exception):
    """Base exception for OMPOI"""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class NotFoundError(OMPOIException):
    def __init__(self, resource: str, resource_id: str):
        super().__init__(
            f"{resource} with id {resource_id} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )

class UnauthorizedError(OMPOIException):
    def __init__(self, message: str = "Unauthorized access"):
        super().__init__(message, status_code=status.HTTP_401_UNAUTHORIZED)

class ForbiddenError(OMPOIException):
    def __init__(self, message: str = "Insufficient permissions"):
        super().__init__(message, status_code=status.HTTP_403_FORBIDDEN)

class ValidationError(OMPOIException):
    def __init__(self, message: str):
        super().__init__(message, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

class RateLimitError(OMPOIException):
    def __init__(self, message: str = "Rate limit exceeded"):
        super().__init__(message, status_code=status.HTTP_429_TOO_MANY_REQUESTS)
```

### 3.8.2 Standard API Responses
```python
# app/common/responses.py
from typing import Any, Optional
from pydantic import BaseModel

class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Any] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[dict] = None

class PaginatedResponse(BaseModel):
    success: bool = True
    data: list
    total: int
    page: int
    page_size: int
    total_pages: int

def success_response(message: str, data: Any = None):
    return SuccessResponse(message=message, data=data).dict()

def error_response(error: str, details: dict = None):
    return ErrorResponse(error=error, details=details).dict()

def paginated_response(data: list, total: int, page: int, page_size: int):
    return PaginatedResponse(
        data=data,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=(total + page_size - 1) // page_size
    ).dict()
```

### 3.8.3 Utility Functions
```python
# app/common/utils.py
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
```

### 3.8.4 Email Client
```python
# app/common/email_client.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from app.core.logging import logger

class EmailClient:
    def __init__(self):
        self.smtp_host = os.getenv("SMTP_HOST")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587))
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
    
    async def send_email(
        self,
        to_email: str,
        subject: str,
        body: str,
        html: bool = False
    ):
        """Send email via SMTP"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = to_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'html' if html else 'plain'))
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Email sent to {to_email}: {subject}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False
    
    async def send_order_confirmation(self, to_email: str, order_number: str):
        """Send order confirmation email"""
        subject = f"Order Confirmation - {order_number}"
        body = f"""
        Dear Customer,
        
        Your order {order_number} has been successfully placed.
        
        You can track your order status on the OMPOI platform.
        
        Best regards,
        OMPOI Team
        """
        return await self.send_email(to_email, subject, body)

# Global instance
email_client = EmailClient()
```

---

## 3.9 Activity Logs Module (CRITICAL)

**Base Path**: `/api/v1/activity` (Internal endpoints only)

This module is **absolutely required** for:
- Dispute resolution
- Compliance (UEF, export regulations)
- Security auditing
- Fraud detection
- User behavior analytics

**Endpoints**:
```
POST   /api/v1/activity/log         # Log activity (internal)
GET    /api/v1/activity/user/{id}   # Get user activity (admin only)
GET    /api/v1/activity/search      # Search activity logs (admin only)
```

**Database Schema** (already added above):
```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(50) NOT NULL,
    record_id UUID,
    metadata JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Implementation**:

```python
# app/activity/models.py
from sqlalchemy import Column, String, DateTime, UUID, Text
from sqlalchemy.dialects.postgresql import JSONB
from app.db.base import Base
from datetime import datetime
import uuid

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=True)
    action = Column(String(100), nullable=False)
    module = Column(String(50), nullable=False)
    record_id = Column(UUID(as_uuid=True), nullable=True)
    metadata = Column(JSONB, nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
```

```python
# app/activity/service.py
from sqlalchemy.orm import Session
from app.activity.models import ActivityLog
from typing import Optional, Dict
import uuid

async def log_activity(
    db: Session,
    user_id: Optional[str],
    action: str,
    module: str,
    record_id: Optional[str] = None,
    metadata: Optional[Dict] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
):
    """
    Log user activity for audit trail
    
    Examples:
    - log_activity(db, user_id, "login", "auth")
    - log_activity(db, user_id, "product_created", "product", product_id)
    - log_activity(db, user_id, "order_placed", "order", order_id, {"amount": 1000})
    - log_activity(db, user_id, "qc_approved", "qc", inspection_id)
    - log_activity(db, user_id, "ai_used", "ai", None, {"endpoint": "price_prediction"})
    """
    activity = ActivityLog(
        user_id=uuid.UUID(user_id) if user_id else None,
        action=action,
        module=module,
        record_id=uuid.UUID(record_id) if record_id else None,
        metadata=metadata,
        ip_address=ip_address,
        user_agent=user_agent
    )
    
    db.add(activity)
    db.commit()
    return activity
```

```python
# app/activity/router.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import require_role
from app.activity.models import ActivityLog
from typing import List

router = APIRouter(prefix="/api/v1/activity", tags=["Activity Logs"])

@router.get("/user/{user_id}")
async def get_user_activity(
    user_id: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):
    """Get activity logs for a specific user (admin only)"""
    activities = db.query(ActivityLog).filter(
        ActivityLog.user_id == user_id
    ).order_by(
        ActivityLog.created_at.desc()
    ).offset(skip).limit(limit).all()
    
    return {"activities": activities}

@router.get("/search")
async def search_activity(
    module: str = None,
    action: str = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):
    """Search activity logs (admin only)"""
    query = db.query(ActivityLog)
    
    if module:
        query = query.filter(ActivityLog.module == module)
    if action:
        query = query.filter(ActivityLog.action == action)
    
    activities = query.order_by(
        ActivityLog.created_at.desc()
    ).offset(skip).limit(limit).all()
    
    return {"activities": activities}
```

**Usage in Other Modules**:

```python
# Example: Log product creation
from app.activity.service import log_activity

@router.post("/products")
async def create_product(
    product: ProductCreate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["seller", "admin"]))
):
    # Create product
    db_product = create_product_service(db, product, current_user["sub"])
    
    # Log activity
    await log_activity(
        db=db,
        user_id=current_user["sub"],
        action="product_created",
        module="product",
        record_id=str(db_product.id),
        metadata={"name": product.name, "grade": product.grade},
        ip_address=request.client.host,
        user_agent=request.headers.get("user-agent")
    )
    
    return db_product

# Example: Log AI usage
@router.post("/ai/product-description")
async def generate_description(
    request: ProductDescriptionRequest,
    http_request: Request,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Generate description
    description = await openrouter.generate_completion(...)
    
    # Log AI usage
    await log_activity(
        db=db,
        user_id=current_user["sub"],
        action="ai_used",
        module="ai",
        metadata={
            "endpoint": "product_description",
            "product_name": request.product_name,
            "tokens_used": 400
        },
        ip_address=http_request.client.host
    )
    
    return {"description": description}
```

---

**Base Path**: `/api/v1/qc`

**Endpoints**:
```
POST   /api/v1/qc/inspections                  # Create inspection
GET    /api/v1/qc/inspections                  # List inspections (role-based)
GET    /api/v1/qc/inspections/{inspection_id}  # Get inspection details
PUT    /api/v1/qc/inspections/{inspection_id}  # Update inspection
POST   /api/v1/qc/inspections/{inspection_id}/approve  # Approve inspection
POST   /api/v1/qc/inspections/{inspection_id}/reject   # Reject inspection
GET    /api/v1/qc/inspections/order/{order_id} # Get inspections for order
GET    /api/v1/qc/inspections/agent/{agent_id} # Get agent's inspections
```

**Database Schema**:
```sql
CREATE TABLE qc_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES users(id),
    inspection_type VARCHAR(50) NOT NULL CHECK (inspection_type IN ('pre_shipment', 'loading', 'destination')),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN 
        ('pending', 'scheduled', 'in_progress', 'completed', 'approved', 'rejected')),
    scheduled_date DATE,
    inspection_date DATE,
    location VARCHAR(255),
    sampling_method VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE qc_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inspection_id UUID REFERENCES qc_inspections(id) ON DELETE CASCADE,
    nut_count_actual VARCHAR(50),
    nut_count_standard VARCHAR(50),
    moisture_content_actual VARCHAR(20),
    moisture_content_standard VARCHAR(20),
    out_turn_actual VARCHAR(20),
    out_turn_standard VARCHAR(20),
    defective_percentage VARCHAR(20),
    foreign_matter VARCHAR(20),
    overall_grade VARCHAR(10),
    compliance_status VARCHAR(20) CHECK (compliance_status IN ('passed', 'failed', 'conditional')),
    observations TEXT,
    recommendations TEXT,
    images JSONB,
    report_url VARCHAR(500),
    signed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qc_inspections_order ON qc_inspections(order_id);
CREATE INDEX idx_qc_inspections_agent ON qc_inspections(agent_id);
CREATE INDEX idx_qc_inspections_status ON qc_inspections(status);
```

### 3.5 AI Module (OpenRouter Integration)

**Base Path**: `/api/v1/ai`

**5 Core AI Endpoints** (v1 - Must Have):

```
POST   /api/v1/ai/product-description    # Generate product description
POST   /api/v1/ai/price-prediction       # Predict market price
POST   /api/v1/ai/quality-analysis       # Analyze quality from images
POST   /api/v1/ai/contract-review        # Review contract terms
GET    /api/v1/ai/market-insights        # Get market insights
```

**Deferred for Later** (v2):
- `/api/v1/ai/chat` - Chatbot support
- `/api/v1/ai/document-extraction` - Extract data from documents

**Request/Response Examples**:

```python
# Product Description Generation
POST /api/v1/ai/product-description
{
    "product_name": "Raw Cashew Nuts",
    "grade": "W240",
    "origin": "Benin",
    "specifications": {
        "nut_count": "185/kg",
        "moisture": "6.5%",
        "out_turn": "49 LBS"
    }
}

Response:
{
    "description": "Premium W240 grade Raw Cashew Nuts from Benin...",
    "model_used": "anthropic/claude-3-sonnet-20240229"
}

# Price Prediction
POST /api/v1/ai/price-prediction
{
    "product_name": "Raw Cashew Nuts W240",
    "origin": "Benin",
    "historical_prices": [
        {"date": "2024-01-01", "price": 8.20},
        {"date": "2024-02-01", "price": 8.35}
    ]
}

Response:
{
    "prediction": {
        "trend": "rising",
        "predicted_range": {"min": 8.40, "max": 8.60},
        "confidence": "high",
        "factors": ["Seasonal demand increase", "Supply constraints"]
    }
}

# Quality Analysis from Image
POST /api/v1/ai/quality-analysis
{
    "image_base64": "iVBORw0KGgoAAAANS...",
    "product_type": "Raw Cashew Nuts"
}

Response:
{
    "analysis": {
        "visual_quality": "good",
        "defects_detected": "minimal surface blemishes",
        "uniformity": "high",
        "estimated_grade": "W240-W320"
    }
}
```

**No Database Tables**: AI module is stateless and makes direct API calls to OpenRouter.

### 3.6 Notifications Module

**Base Path**: `/api/v1/notifications`

**Endpoints** (Minimal for v1):
```
POST   /api/v1/notifications/send           # Send notification (internal/admin)
GET    /api/v1/notifications/user/{user_id} # Get user notifications (optional)
```

**Database Schema** (Optional - can start with just email logs):
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'sms')),
    category VARCHAR(50) CHECK (category IN ('order', 'qc', 'system')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'failed')),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
```

**Implementation**: Simple SMTP/SendGrid integration. No complex preferences or bulk sending for v1.

### 3.7 Admin & Analytics Module

**Base Path**: `/api/v1/admin`

**Endpoints**:
```
GET    /api/v1/admin/dashboard              # Get dashboard overview
GET    /api/v1/admin/users                  # List all users
GET    /api/v1/admin/orders/stats           # Order statistics
GET    /api/v1/admin/products/stats         # Product statistics
GET    /api/v1/admin/qc/stats               # QC statistics
```

**No Separate Tables**: Use live SQL queries on existing tables for analytics.

Example dashboard query:
```python
# app/admin/analytics.py
async def get_dashboard_stats(db: Session):
    return {
        "total_orders": db.query(Order).count(),
        "active_users": db.query(User).filter(User.status == 'active').count(),
        "pending_qc": db.query(QCInspection).filter(QCInspection.status == 'pending').count(),
        "total_gmv": db.query(func.sum(Order.total_value)).scalar(),
    }
```

---

## 4. Database Design - NeonDB (Single Schema)

### 4.1 NeonDB Configuration

**Connection String**:
```
postgresql://user:password@neon-serverless-host.neon.tech:5432/ompoi_db?sslmode=require
```

**Features to Leverage**:
- Serverless PostgreSQL with auto-scaling
- Branch-based development (separate DB branches for dev/staging/prod)
- Connection pooling via PgBouncer (built-in)
- Point-in-time recovery
- Automated backups
- Instant compute scaling

### 4.2 Database Structure (Single Schema for v1)

```
ompoi_db/
└── public (main schema)
    ├── users
    ├── user_profiles
    ├── products
    ├── product_specifications
    ├── orders
    ├── order_items
    ├── order_timeline
    ├── qc_inspections
    ├── qc_reports
    └── notifications (optional)
```

**NOT included in v1**:
- ❌ Separate `analytics` schema
- ❌ Separate `audit` schema
- ❌ `inventory` and `inventory_movements` tables
- ❌ `payments` and `invoices` tables (comprehensive version)
- ❌ `analytics_reports` and `dashboard_metrics` tables
- ❌ `notification_preferences` table

### 4.3 Complete Database Schema (v1)

```sql
-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('buyer', 'seller', 'agent', 'admin')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'locked', 'pending')),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255),
    business_type VARCHAR(100),
    address JSONB,
    documents JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    grade VARCHAR(50),
    origin VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    specifications JSONB NOT NULL,
    price_per_kg DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    packaging VARCHAR(100),
    certifications JSONB,
    images JSONB,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    nut_count VARCHAR(50),
    moisture_content VARCHAR(20),
    out_turn VARCHAR(20),
    defective_percentage VARCHAR(20),
    quality_parameters JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    seller_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    product_id UUID REFERENCES products(id) ON DELETE RESTRICT,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'MT',
    price_per_kg DECIMAL(10, 2) NOT NULL,
    total_value DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(30) DEFAULT 'new' CHECK (status IN 
        ('new', 'processing', 'qc_pending', 'qc_approved', 'qc_rejected', 
         'payment_pending', 'payment_completed', 'shipped', 'delivered', 'cancelled')),
    payment_terms JSONB,
    delivery_terms JSONB,
    contract_url VARCHAR(500),
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255),
    grade VARCHAR(50),
    origin VARCHAR(100),
    packaging VARCHAR(100),
    quantity DECIMAL(10, 2) NOT NULL,
    price_per_kg DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL
);

CREATE TABLE order_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quality Control
CREATE TABLE qc_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES users(id),
    inspection_type VARCHAR(50) NOT NULL CHECK (inspection_type IN ('pre_shipment', 'loading', 'destination')),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN 
        ('pending', 'scheduled', 'in_progress', 'completed', 'approved', 'rejected')),
    scheduled_date DATE,
    inspection_date DATE,
    location VARCHAR(255),
    sampling_method VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE qc_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inspection_id UUID REFERENCES qc_inspections(id) ON DELETE CASCADE,
    nut_count_actual VARCHAR(50),
    nut_count_standard VARCHAR(50),
    moisture_content_actual VARCHAR(20),
    moisture_content_standard VARCHAR(20),
    out_turn_actual VARCHAR(20),
    out_turn_standard VARCHAR(20),
    defective_percentage VARCHAR(20),
    foreign_matter VARCHAR(20),
    overall_grade VARCHAR(10),
    compliance_status VARCHAR(20) CHECK (compliance_status IN ('passed', 'failed', 'conditional')),
    observations TEXT,
    recommendations TEXT,
    images JSONB,
    report_url VARCHAR(500),
    signed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications (Optional for v1)
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'sms')),
    category VARCHAR(50) CHECK (category IN ('order', 'qc', 'system')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'failed')),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs (CRITICAL for compliance & disputes)
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(50) NOT NULL CHECK (module IN ('auth', 'product', 'order', 'qc', 'ai', 'admin')),
    record_id UUID,
    metadata JSONB,  -- Store additional context
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_origin ON products(origin);
CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_seller ON orders(seller_id);
CREATE INDEX idx_orders_broker ON orders(broker_id);  -- CRITICAL: Index for broker queries
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_qc_inspections_order ON qc_inspections(order_id);
CREATE INDEX idx_qc_inspections_agent ON qc_inspections(agent_id);
CREATE INDEX idx_qc_inspections_status ON qc_inspections(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_module ON activity_logs(module);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
```

### 4.4 Database Migration Strategy

**Tool**: Alembic

**Setup**:
```bash
pip install alembic
alembic init alembic
```

**Directory Structure**:
```
alembic/
├── versions/
│   ├── 001_initial_schema.py
│   ├── 002_add_qc_tables.py
│   └── 003_add_notifications.py
├── env.py
└── alembic.ini
```

**Example Migration**:
```python
# alembic/versions/001_initial_schema.py
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('password_hash', sa.String(255), nullable=False),
        sa.Column('role', sa.String(20), nullable=False),
        sa.Column('status', sa.String(20), server_default='active', nullable=False),
        sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP')),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

def downgrade():
    op.drop_table('users')
```

### 4.5 Database Connection (FastAPI)

```python
# app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## 5. Logging & Basic Monitoring (v1)

### 5.1 Simple Logging Strategy

For v1, we keep logging simple with structured JSON logs to stdout. **No Prometheus/Grafana yet.**

**Structured Logging Setup**:
```python
# app/core/logging.py
import logging
import json
from datetime import datetime
import sys

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "service": "ompoi-backend",
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
        }
        
        # Add extra fields if present
        if hasattr(record, 'user_id'):
            log_data['user_id'] = record.user_id
        if hasattr(record, 'request_id'):
            log_data['request_id'] = record.request_id
        if hasattr(record, 'duration'):
            log_data['duration_ms'] = record.duration
            
        if record.exc_info:
            log_data['exception'] = self.formatException(record.exc_info)
            
        return json.dumps(log_data)

# Setup logger
def setup_logging():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JSONFormatter())
    logger.addHandler(handler)
    
    return logger

logger = setup_logging()
```

**Usage in Routes**:
```python
from app.core.logging import logger

@router.post("/orders")
async def create_order(order: OrderCreate, current_user: dict = Depends(get_current_user)):
    logger.info(
        "Creating order",
        extra={
            "user_id": current_user["sub"],
            "product_id": order.product_id,
            "quantity": order.quantity
        }
    )
    # ... order creation logic
```

### 5.2 Request Logging Middleware

```python
# app/main.py
import time
from fastapi import Request

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Add request ID for tracking
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    
    response = await call_next(request)
    
    duration = (time.time() - start_time) * 1000  # ms
    
    logger.info(
        "HTTP Request",
        extra={
            "request_id": request_id,
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "duration_ms": round(duration, 2),
        }
    )
    
    return response
```

### 5.3 Health Check Endpoint

```python
# app/main.py
from fastapi import status
from sqlalchemy import text

@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check(db: Session = Depends(get_db)):
    try:
        # Check database connection
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }
```

### 5.4 Error Handling

```python
# app/core/exceptions.py
from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse

class OMPOIException(Exception):
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code

@app.exception_handler(OMPOIException)
async def ompoi_exception_handler(request: Request, exc: OMPOIException):
    logger.error(
        f"OMPOI Exception: {exc.message}",
        extra={
            "path": request.url.path,
            "method": request.method,
            "status_code": exc.status_code
        }
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(
        f"Unhandled exception: {str(exc)}",
        extra={
            "path": request.url.path,
            "method": request.method
        },
        exc_info=True
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )
```

### 5.5 What We're NOT Doing (Phase LATER)

❌ **Prometheus + Grafana stack** - Too complex for v1  
❌ **Custom metrics collection** - Can add later  
❌ **Distributed tracing (Jaeger/Zipkin)** - Not needed for monolith  
❌ **Log aggregation (ELK/Loki)** - Can use cloud provider logs  
❌ **APM tools (New Relic/Datadog)** - Expensive for MVP  

**For v1**: Just good structured logging + health checks. Your cloud provider (AWS/Hostinger) will aggregate logs.

---

## 6. Authentication & Security

### 6.1 JWT Authentication (No API Gateway for v1)

For v1, we handle authentication directly in FastAPI. **No Kong/Traefik yet.**

**Token Structure**:
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "seller",
  "iat": 1234567890,
  "exp": 1234571490
}
```

**Implementation**:
```python
# app/core/security.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

# Role-based access control
def require_role(allowed_roles: list):
    async def role_checker(current_user: dict = Depends(get_current_user)):
        if current_user.get("role") not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker
```

**Usage in Routes**:
```python
# app/users/router.py
from app.core.security import get_current_user, require_role

@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    # Any authenticated user can access
    return {"user": current_user}

@router.get("/admin/users")
async def list_users(current_user: dict = Depends(require_role(["admin"]))):
    # Only admins can access
    return {"users": []}

@router.post("/products")
async def create_product(
    product: ProductCreate,
    current_user: dict = Depends(require_role(["seller", "admin"]))
):
    # Only sellers and admins can create products
    return {"product_id": "..."}
```

### 6.2 CORS Configuration (CRITICAL FIX)

**Must support ALL environments and subdomains:**

```python
# app/main.py
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# CRITICAL: Configure CORS for ALL 4 subdomains + dev environments
allowed_origins = [
    # Production subdomains
    "https://buyer.ompoi.com",
    "https://seller.ompoi.com",
    "https://agent.ompoi.com",
    "https://admin.ompoi.com",
    
    # Staging subdomains
    "https://buyer-staging.ompoi.com",
    "https://seller-staging.ompoi.com",
    "https://agent-staging.ompoi.com",
    "https://admin-staging.ompoi.com",
    
    # Development (Next.js default)
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    
    # Development (Vite default)
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
]

# Add environment-specific origins
if os.getenv("ENVIRONMENT") == "development":
    allowed_origins.append("http://127.0.0.1:3000")
    allowed_origins.append("http://127.0.0.1:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Allow clients to read custom headers
)
```

**Environment Variables for CORS**:
```bash
# .env
FRONTEND_URL_BUYER=https://buyer.ompoi.com
FRONTEND_URL_SELLER=https://seller.ompoi.com
FRONTEND_URL_AGENT=https://agent.ompoi.com
FRONTEND_URL_ADMIN=https://admin.ompoi.com

# For dynamic CORS in production
ALLOWED_ORIGINS=https://buyer.ompoi.com,https://seller.ompoi.com,https://agent.ompoi.com,https://admin.ompoi.com
```

### 6.3 Rate Limiting (Simple in-memory for v1)

```python
# app/core/rate_limit.py
from fastapi import HTTPException, Request
from collections import defaultdict
from datetime import datetime, timedelta
import asyncio

class SimpleRateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
        
    async def check_rate_limit(self, request: Request):
        client_ip = request.client.host
        now = datetime.utcnow()
        
        # Clean old requests
        self.requests[client_ip] = [
            req_time for req_time in self.requests[client_ip]
            if now - req_time < timedelta(minutes=1)
        ]
        
        # Check limit
        if len(self.requests[client_ip]) >= self.requests_per_minute:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded"
            )
        
        # Add current request
        self.requests[client_ip].append(now)

# Usage
rate_limiter = SimpleRateLimiter(requests_per_minute=100)

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    if request.url.path.startswith("/api/"):
        await rate_limiter.check_rate_limit(request)
    response = await call_next(request)
    return response
```

### 6.4 Security Best Practices Checklist

✅ **For v1 (Must Have)**:
- [x] Passwords hashed with bcrypt
- [x] JWT tokens with 60-minute expiry
- [x] HTTPS enforced (via reverse proxy/cloud)
- [x] SQL injection prevention (SQLAlchemy parameterized queries)
- [x] Simple rate limiting
- [x] CORS properly configured
- [x] Input validation (Pydantic schemas)
- [x] Environment variables for secrets

❌ **For Later (Phase 2)**:
- [ ] Redis-based distributed rate limiting
- [ ] API Gateway (Kong/Traefik) with advanced rate limiting
- [ ] WAF (Web Application Firewall)
- [ ] DDoS protection
- [ ] OAuth2/Social login integration
- [ ] 2FA/MFA
- [ ] Advanced audit logging

---

## 7. AI Integration - OpenRouter (5 Core Services)

### 7.1 OpenRouter Setup

**Environment Variables**:
```bash
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=anthropic/claude-3-sonnet-20240229
```

### 7.2 AI Client Configuration (CRITICAL: With Rate Limiting)

```python
# app/common/ai_client.py
from openai import AsyncOpenAI
from collections import defaultdict
from datetime import datetime, timedelta
from fastapi import HTTPException
import os

class OpenRouterClient:
    # CRITICAL: Rate limit configuration
    MAX_AI_CALLS_PER_MINUTE = 20
    MAX_AI_CALLS_PER_USER_PER_DAY = 200
    
    def __init__(self):
        self.client = AsyncOpenAI(
            base_url=os.getenv("OPENROUTER_BASE_URL"),
            api_key=os.getenv("OPENROUTER_API_KEY"),
        )
        self.default_model = os.getenv("OPENROUTER_DEFAULT_MODEL")
        
        # Rate limiting tracking
        self.user_daily_calls = defaultdict(list)  # {user_id: [timestamps]}
        self.global_minute_calls = []
    
    async def check_rate_limit(self, user_id: str):
        """
        CRITICAL: Prevent AI cost explosion
        Without this, one misclick → ₹3,000+ AI bill
        """
        now = datetime.utcnow()
        
        # Check global per-minute limit
        self.global_minute_calls = [
            ts for ts in self.global_minute_calls
            if now - ts < timedelta(minutes=1)
        ]
        
        if len(self.global_minute_calls) >= self.MAX_AI_CALLS_PER_MINUTE:
            raise HTTPException(
                status_code=429,
                detail="AI service rate limit exceeded. Please try again in a minute."
            )
        
        # Check per-user daily limit
        self.user_daily_calls[user_id] = [
            ts for ts in self.user_daily_calls[user_id]
            if now - ts < timedelta(days=1)
        ]
        
        if len(self.user_daily_calls[user_id]) >= self.MAX_AI_CALLS_PER_USER_PER_DAY:
            raise HTTPException(
                status_code=429,
                detail=f"Daily AI usage limit reached ({self.MAX_AI_CALLS_PER_USER_PER_DAY} requests/day). Please try again tomorrow."
            )
        
        # Record this call
        self.global_minute_calls.append(now)
        self.user_daily_calls[user_id].append(now)
    
    async def generate_completion(
        self, 
        prompt: str,
        user_id: str,  # CRITICAL: Track per-user usage
        model: str = None,
        max_tokens: int = 500
    ):
        # Check rate limit first
        await self.check_rate_limit(user_id)
        
        model = model or self.default_model
        response = await self.client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
        )
        return response.choices[0].message.content
    
    async def analyze_image(
        self,
        prompt: str,
        image_base64: str,
        user_id: str,  # CRITICAL: Track per-user usage
        model: str = None,
        max_tokens: int = 1000
    ):
        # Check rate limit first
        await self.check_rate_limit(user_id)
        
        model = model or self.default_model
        response = await self.client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=max_tokens,
        )
        return response.choices[0].message.content
    
    def get_user_usage_stats(self, user_id: str):
        """Get current usage stats for a user"""
        now = datetime.utcnow()
        daily_calls = [
            ts for ts in self.user_daily_calls[user_id]
            if now - ts < timedelta(days=1)
        ]
        
        return {
            "calls_today": len(daily_calls),
            "daily_limit": self.MAX_AI_CALLS_PER_USER_PER_DAY,
            "remaining_today": self.MAX_AI_CALLS_PER_USER_PER_DAY - len(daily_calls)
        }

# Global instance
openrouter = OpenRouterClient()
```

**Environment Variables**:
```bash
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=anthropic/claude-3-sonnet-20240229

# Rate limiting (optional override)
AI_MAX_CALLS_PER_MINUTE=20
AI_MAX_CALLS_PER_USER_PER_DAY=200
```

### 7.3 AI Service Implementation (5 Required Endpoints)

```python
# app/ai/router.py
from fastapi import APIRouter, HTTPException, Depends
from app.common.ai_client import openrouter
from app.ai.schemas import *
from app.core.logging import logger
from app.core.security import get_current_user

router = APIRouter(prefix="/api/v1/ai", tags=["AI Services"])

# 1. Product Description Generation
@router.post("/product-description")
async def generate_product_description(
    request: ProductDescriptionRequest,
    current_user: dict = Depends(get_current_user)
):
    """Generate compelling product descriptions for marketplace listings"""
    
    prompt = f"""Generate a professional product description for an agricultural commodity marketplace.

Product: {request.product_name}
Grade: {request.grade}
Origin: {request.origin}
Specifications: {request.specifications}

Create a concise, buyer-focused description (max 200 words) highlighting:
1. Product quality and grade
2. Origin and sourcing
3. Key specifications
4. Suitable applications
5. Quality certifications (if any)

Write in a professional tone suitable for B2B buyers."""

    try:
        description = await openrouter.generate_completion(
            prompt,
            user_id=current_user["sub"],  # CRITICAL: Track usage per user
            max_tokens=400
        )
        
        logger.info(
            "Generated product description",
            extra={
                "user_id": current_user["sub"],
                "product_name": request.product_name,
                "grade": request.grade
            }
        )
        
        # Get usage stats
        usage_stats = openrouter.get_user_usage_stats(current_user["sub"])
        
        return {
            "description": description,
            "model_used": openrouter.default_model,
            "usage_stats": usage_stats  # Show user their remaining quota
        }
    except HTTPException:
        raise  # Re-raise rate limit errors
    except Exception as e:
        logger.error(f"Product description generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 2. Market Price Prediction
@router.post("/price-prediction")
async def predict_market_price(request: PricePredictionRequest):
    """Predict market prices based on historical data and trends"""
    
    # Format historical prices
    prices_text = "\n".join([
        f"- {p['date']}: ${p['price']}/kg"
        for p in request.historical_prices
    ])
    
    prompt = f"""Analyze the following market data and provide price prediction.

Product: {request.product_name}
Origin: {request.origin}

Historical Prices (Last 6-12 months):
{prices_text}

Provide analysis in the following JSON format:
{{
    "trend": "rising|falling|stable",
    "predicted_price_range": {{
        "min": <float>,
        "max": <float>,
        "currency": "USD"
    }},
    "confidence": "high|medium|low",
    "key_factors": [
        "factor 1",
        "factor 2",
        "factor 3"
    ],
    "recommendation": "brief text recommendation for buyers/sellers"
}}

Consider seasonal patterns, supply/demand, and market trends."""

    try:
        prediction = await openrouter.generate_completion(prompt, max_tokens=600)
        
        logger.info(
            "Generated price prediction",
            extra={"product_name": request.product_name}
        )
        
        return {"prediction": prediction}
    except Exception as e:
        logger.error(f"Price prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 3. Quality Analysis from Images
@router.post("/quality-analysis")
async def analyze_quality_from_image(request: QualityAnalysisRequest):
    """Analyze product quality from uploaded images"""
    
    prompt = f"""You are a quality control expert analyzing {request.product_type}.

Analyze this image and provide a detailed quality assessment in JSON format:

{{
    "overall_quality": "excellent|good|fair|poor",
    "visual_observations": {{
        "color": "description",
        "uniformity": "description",
        "size_consistency": "description",
        "surface_condition": "description"
    }},
    "defects_detected": [
        {{"type": "defect type", "severity": "minor|major", "description": "..."}}
    ],
    "estimated_grade": "W240|W320|etc",
    "compliance_notes": "notes on quality standards",
    "recommendations": "suggestions for improvement or handling"
}}

Be specific and professional in your assessment."""

    try:
        analysis = await openrouter.analyze_image(
            prompt, 
            request.image_base64,
            max_tokens=1000
        )
        
        logger.info(
            "Generated quality analysis",
            extra={"product_type": request.product_type}
        )
        
        return {"analysis": analysis}
    except Exception as e:
        logger.error(f"Quality analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 4. Contract Review
@router.post("/contract-review")
async def review_contract(request: ContractReviewRequest):
    """Review and extract key terms from trade contracts"""
    
    prompt = f"""You are a legal expert reviewing agricultural commodity trade contracts.

Analyze the following contract text and extract key information:

Contract Text:
{request.contract_text}

Provide analysis in JSON format:
{{
    "contract_type": "purchase|sale|agency",
    "key_terms": {{
        "buyer": "name",
        "seller": "name",
        "product": "description",
        "quantity": "amount and unit",
        "price": "amount and currency",
        "payment_terms": "description",
        "delivery_terms": "incoterms and location",
        "quality_specs": "specifications",
        "inspection_terms": "requirements"
    }},
    "potential_issues": [
        {{"issue": "description", "severity": "high|medium|low", "recommendation": "..."}}
    ],
    "missing_clauses": ["list of important missing terms"],
    "risk_assessment": "overall risk level and explanation",
    "compliance_notes": "regulatory or standard compliance observations"
}}

Be thorough and highlight any ambiguous or concerning terms."""

    try:
        review = await openrouter.generate_completion(prompt, max_tokens=1200)
        
        logger.info("Generated contract review")
        
        return {"review": review}
    except Exception as e:
        logger.error(f"Contract review failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 5. Market Insights
@router.get("/market-insights")
async def get_market_insights(
    product: str = "cashew nuts",
    region: str = "West Africa"
):
    """Get current market insights and trends"""
    
    prompt = f"""Provide current market insights for {product} from {region}.

Generate a comprehensive market analysis in JSON format:
{{
    "market_overview": "brief overview of current market conditions",
    "supply_demand": {{
        "supply_status": "abundant|adequate|constrained",
        "demand_trend": "increasing|stable|decreasing",
        "explanation": "detailed explanation"
    }},
    "price_trends": {{
        "current_direction": "upward|stable|downward",
        "factors": ["factor 1", "factor 2"],
        "outlook": "short-term outlook"
    }},
    "quality_trends": "observations on quality and grading",
    "logistics_notes": "shipping and logistics considerations",
    "seasonal_factors": "relevant seasonal patterns",
    "trading_opportunities": "potential opportunities for buyers/sellers",
    "risk_factors": ["risk 1", "risk 2"],
    "generated_at": "timestamp"
}}

Base your analysis on general market knowledge and trends."""

    try:
        insights = await openrouter.generate_completion(prompt, max_tokens=1000)
        
        logger.info(
            "Generated market insights",
            extra={"product": product, "region": region}
        )
        
        return {"insights": insights, "product": product, "region": region}
    except Exception as e:
        logger.error(f"Market insights generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
```

### 7.4 Pydantic Schemas

```python
# app/ai/schemas.py
from pydantic import BaseModel
from typing import List, Dict, Any

class ProductDescriptionRequest(BaseModel):
    product_name: str
    grade: str
    origin: str
    specifications: Dict[str, Any]

class PricePredictionRequest(BaseModel):
    product_name: str
    origin: str
    historical_prices: List[Dict[str, Any]]  # [{"date": "2024-01-01", "price": 8.20}]

class QualityAnalysisRequest(BaseModel):
    image_base64: str
    product_type: str

class ContractReviewRequest(BaseModel):
    contract_text: str

class MarketInsightsRequest(BaseModel):
    product: str = "cashew nuts"
    region: str = "West Africa"
```

### 7.5 Cost Tracking

```python
# Simple cost tracking in logs
logger.info(
    "AI API call",
    extra={
        "endpoint": "product-description",
        "model": openrouter.default_model,
        "estimated_tokens": 500,
        "estimated_cost_usd": 0.003  # Approximate
    }
)
```

**Note**: For v1, we track costs via logs. Later, we can add more sophisticated cost tracking with Prometheus metrics or a dedicated table.

---

## 8. Deployment Architecture (v1 - Simple)

### 8.1 Docker Setup

**Dockerfile**:
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./app ./app
COPY ./alembic ./alembic
COPY alembic.ini .

# Expose port
EXPOSE 8000

# Run database migrations and start server
CMD alembic upgrade head && \
    uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**docker-compose.yml** (Development):
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
      - OPENROUTER_DEFAULT_MODEL=anthropic/claude-3-sonnet-20240229
    env_file:
      - .env
    volumes:
      - ./app:/app/app  # Hot reload for development
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Note: NeonDB is external, so no database container needed
```

### 8.2 Environment Variables

**.env.example**:
```bash
# Database (NeonDB)
DATABASE_URL=postgresql://user:password@neon-host.neon.tech:5432/ompoi_db?sslmode=require

# JWT
JWT_SECRET_KEY=your-super-secret-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60

# OpenRouter AI
OPENROUTER_API_KEY=sk-or-v1-your-key-here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=anthropic/claude-3-sonnet-20240229

# Frontend URLs (for CORS)
FRONTEND_URL_BUYER=https://buyer.ompoi.com
FRONTEND_URL_SELLER=https://seller.ompoi.com
FRONTEND_URL_AGENT=https://agent.ompoi.com
FRONTEND_URL_ADMIN=https://admin.ompoi.com

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Storage (Optional)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=ompoi-uploads
AWS_REGION=us-east-1

# Application
ENVIRONMENT=production
LOG_LEVEL=INFO
```

### 8.3 Simple VPS Deployment

**Option 1: AWS EC2 / DigitalOcean / Hostinger VPS**

1. **Setup Server** (Ubuntu 22.04):
```bash
# SSH into server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **Deploy Application**:
```bash
# Clone repository
git clone https://github.com/your-org/ompoi-backend.git
cd ompoi-backend

# Create .env file
nano .env
# (paste your production environment variables)

# Build and run
docker-compose up -d

# Check logs
docker-compose logs -f
```

3. **Setup Nginx Reverse Proxy**:
```bash
# Install Nginx
sudo apt install nginx -y

# Configure Nginx
sudo nano /etc/nginx/sites-available/ompoi-backend
```

```nginx
server {
    listen 80;
    server_name api.ompoi.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ompoi-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.ompoi.com
```

4. **Setup Auto-restart**:
```bash
# Create systemd service
sudo nano /etc/systemd/system/ompoi-backend.service
```

```ini
[Unit]
Description=OMPOI Backend Service
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/ompoi-backend
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable ompoi-backend
sudo systemctl start ompoi-backend
```

### 8.4 Database Migrations

```bash
# Run migrations manually
docker-compose exec backend alembic upgrade head

# Create new migration
docker-compose exec backend alembic revision --autogenerate -m "description"

# Rollback migration
docker-compose exec backend alembic downgrade -1
```

### 8.5 CI/CD Setup (Simple GitHub Actions)

**.github/workflows/deploy.yml**:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/ubuntu/ompoi-backend
            git pull origin main
            docker-compose down
            docker-compose build
            docker-compose up -d
            docker-compose exec -T backend alembic upgrade head
```

### 8.6 What We're NOT Doing (Phase LATER)

❌ **Kubernetes** - Overkill for single monolith  
❌ **Multiple containers/pods** - Just one backend container  
❌ **Service mesh** - No inter-service communication  
❌ **Auto-scaling groups** - VPS is sufficient for v1  
❌ **Load balancer** - Single instance is fine  
❌ **Container orchestration** - Docker Compose is enough  
❌ **Blue-green deployments** - Simple rolling updates  

**For v1**: Single Docker container on a VPS with Nginx reverse proxy and SSL. This can handle thousands of requests/day easily.

---

## 8. Security Best Practices

### 8.1 Security Checklist
- [ ] All passwords hashed with bcrypt/argon2
- [ ] JWT tokens with short expiry (60 minutes)
- [ ] HTTPS only (TLS 1.3)
- [ ] SQL injection prevention (parameterized queries)
- [ ] Rate limiting on all endpoints
- [ ] CORS configuration
- [ ] Input validation and sanitization
- [ ] Secrets management (Kubernetes secrets / AWS Secrets Manager)
- [ ] Database connection pooling
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning

### 8.2 Environment Variables Management

```bash
# .env.example
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://localhost:6379
JWT_SECRET_KEY=your-secret-key-here
OPENROUTER_API_KEY=sk-or-v1-xxxxx
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

---

## 9. Testing Strategy

### 9.1 Unit Tests
```python
# tests/test_users.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_register_user():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/auth/register",
            json={
                "email": "test@example.com",
                "password": "SecurePass123!",
                "role": "buyer",
                "phone": "+1234567890"
            }
        )
        assert response.status_code == 201
        assert response.json()["email"] == "test@example.com"

@pytest.mark.asyncio
async def test_login():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # First register
        await client.post(
            "/api/v1/auth/register",
            json={
                "email": "test@example.com",
                "password": "SecurePass123!",
                "role": "buyer"
            }
        )
        
        # Then login
        response = await client.post(
            "/api/v1/auth/login",
            json={
                "email": "test@example.com",
                "password": "SecurePass123!"
            }
        )
        assert response.status_code == 200
        assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_create_product_requires_auth():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/products",
            json={
                "name": "Raw Cashew Nuts",
                "grade": "W240",
                "origin": "Benin"
            }
        )
        assert response.status_code == 401  # Unauthorized
```

### 9.2 Integration Tests
```python
# tests/test_order_flow.py
@pytest.mark.asyncio
async def test_complete_order_flow():
    """Test the complete order flow from creation to QC"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # 1. Register seller
        seller_response = await client.post("/api/v1/auth/register", json={...})
        seller_token = seller_response.json()["access_token"]
        
        # 2. Create product
        product_response = await client.post(
            "/api/v1/products",
            json={...},
            headers={"Authorization": f"Bearer {seller_token}"}
        )
        product_id = product_response.json()["id"]
        
        # 3. Register buyer
        buyer_response = await client.post("/api/v1/auth/register", json={...})
        buyer_token = buyer_response.json()["access_token"]
        
        # 4. Create order
        order_response = await client.post(
            "/api/v1/orders",
            json={"product_id": product_id, "quantity": 100},
            headers={"Authorization": f"Bearer {buyer_token}"}
        )
        assert order_response.status_code == 201
        
        # 5. Create QC inspection
        # ... etc
```

### 9.3 Test Configuration

**pytest.ini**:
```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
asyncio_mode = auto
```

**conftest.py**:
```python
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.base import Base
from app.core.config import settings

# Test database
TEST_DATABASE_URL = "postgresql://test_user:test_pass@localhost:5432/test_db"

@pytest.fixture(scope="session")
def engine():
    engine = create_engine(TEST_DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    yield engine
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session(engine):
    connection = engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()
    
    yield session
    
    session.close()
    transaction.rollback()
    connection.close()
```

---

## 10. Project Timeline (Realistic for Modular Monolith)

### Phase 1: Foundation & Core Setup (Week 1)
**Days 1-2: Project Setup**
- [x] Initialize FastAPI project structure
- [x] Setup NeonDB connection
- [x] Configure Alembic migrations
- [x] Setup Docker and docker-compose
- [x] Create .env and configuration

**Days 3-4: Users & Authentication Module**
- [x] Implement user registration
- [x] Implement JWT authentication
- [x] Create user profile endpoints
- [x] Role-based access control
- [x] Password hashing with bcrypt

**Days 5-7: Testing & Documentation**
- [x] Write unit tests for auth
- [x] Setup CI/CD pipeline
- [x] API documentation (Swagger)
- [x] Deploy to staging

### Phase 2: Core Business Modules (Weeks 2-3)

**Week 2: Products & Orders**
- [ ] Implement Products module
  - CRUD operations
  - Product search
  - Image upload
  - Specifications management
- [ ] Implement Orders module
  - Order creation
  - Order lifecycle
  - Timeline tracking
  - Status updates

**Week 3: QC & Notifications**
- [ ] Implement QC module
  - Inspection creation
  - QC reports
  - Approval/rejection workflow
- [ ] Implement Notifications module
  - Email notifications
  - SMTP integration
  - Notification triggers

### Phase 3: AI Integration (Week 4)
**Days 1-2: OpenRouter Setup**
- [ ] Configure OpenRouter client
- [ ] Implement error handling
- [ ] Cost tracking setup

**Days 3-7: 5 AI Endpoints**
- [ ] Product description generation
- [ ] Price prediction
- [ ] Quality analysis from images
- [ ] Contract review
- [ ] Market insights

### Phase 4: Admin & Polish (Week 5)
**Days 1-3: Admin Module**
- [ ] Dashboard analytics
- [ ] User management
- [ ] Order statistics
- [ ] Simple reporting

**Days 4-5: Security & Performance**
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Security audit
- [ ] Performance optimization

**Days 6-7: Testing & Bug Fixes**
- [ ] Integration testing
- [ ] Load testing
- [ ] Bug fixes
- [ ] Documentation updates

### Phase 5: Deployment & Launch (Week 6)
**Days 1-2: Production Setup**
- [ ] VPS configuration
- [ ] Nginx setup
- [ ] SSL certificates
- [ ] Environment configuration

**Days 3-4: Deployment & Monitoring**
- [ ] Deploy to production
- [ ] Setup logging
- [ ] Health checks
- [ ] Monitoring dashboard

**Days 5-7: Launch & Support**
- [ ] Final testing
- [ ] User acceptance testing
- [ ] Documentation
- [ ] Go live!

### Total Timeline: **6 weeks** (realistic)

### Team Requirements:
- **Backend Developers**: 2-3
- **DevOps Engineer**: 1 (part-time)
- **QA/Testing**: 1 (part-time)

### Cost Estimate:
**Development**: $25,000 - $35,000 (depending on team rates)
**Infrastructure** (monthly):
- NeonDB: $50-100
- VPS (4GB RAM, 2 CPU): $20-40
- OpenRouter API: $100-300
- Domain & SSL: $15
- **Total**: ~$200-450/month

---

## 11. Development Guidelines

### 11.1 Code Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app + router registration
│   │
│   ├── core/                      # Shared infrastructure
│   │   ├── __init__.py
│   │   ├── config.py              # Settings (pydantic BaseSettings)
│   │   ├── security.py            # JWT, password hashing, dependencies
│   │   ├── database.py            # DB session, engine
│   │   ├── logging.py             # Structured logging setup
│   │   └── exceptions.py          # Custom exceptions
│   │
│   ├── db/                        # Database setup
│   │   ├── __init__.py
│   │   ├── base.py                # SQLAlchemy Base import
│   │   └── session.py             # Session dependency
│   │
│   ├── users/                     # User module (microservice-ready)
│   │   ├── __init__.py
│   │   ├── router.py              # FastAPI routes
│   │   ├── models.py              # SQLAlchemy models
│   │   ├── schemas.py             # Pydantic schemas
│   │   ├── service.py             # Business logic
│   │   └── deps.py                # Module dependencies (optional)
│   │
│   ├── products/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── orders/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── qc/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── ai/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── client.py              # OpenRouter client
│   │   └── schemas.py
│   │
│   ├── notifications/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── service.py             # Email sending logic
│   │   └── schemas.py
│   │
│   └── admin/
│       ├── __init__.py
│       ├── router.py
│       ├── analytics.py           # SQL-based analytics
│       └── schemas.py
│
├── alembic/                       # Database migrations
│   ├── versions/
│   ├── env.py
│   └── alembic.ini
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_users.py
│   ├── test_products.py
│   ├── test_orders.py
│   ├── test_qc.py
│   └── test_ai.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
├── .gitignore
├── pytest.ini
└── README.md
```

### 11.2 Main Application Setup

```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logging, logger
from app.core.exceptions import ompoi_exception_handler, OMPOIException

# Import routers
from app.users.router import router as users_router
from app.products.router import router as products_router
from app.orders.router import router as orders_router
from app.qc.router import router as qc_router
from app.ai.router import router as ai_router
from app.notifications.router import router as notifications_router
from app.admin.router import router as admin_router

# Setup logging
setup_logging()

# Create FastAPI app
app = FastAPI(
    title="OMPOI API",
    description="Agricultural Commodity Marketplace API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(OMPOIException, ompoi_exception_handler)

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# Include routers
app.include_router(users_router)
app.include_router(products_router)
app.include_router(orders_router)
app.include_router(qc_router)
app.include_router(ai_router)
app.include_router(notifications_router)
app.include_router(admin_router)

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("OMPOI Backend starting up...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Database: {settings.DATABASE_URL.split('@')[1] if '@' in settings.DATABASE_URL else 'configured'}")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("OMPOI Backend shutting down...")
```

### 11.3 Module Example (Products)

```python
# app/products/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.core.security import get_current_user, require_role
from app.products import service
from app.products.schemas import Product, ProductCreate, ProductUpdate

router = APIRouter(prefix="/api/v1/products", tags=["Products"])

@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["seller", "admin"]))
):
    """Create a new product listing"""
    return service.create_product(db, product, current_user["sub"])

@router.get("/", response_model=List[Product])
async def list_products(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List all products with pagination"""
    return service.get_products(db, skip=skip, limit=limit)

@router.get("/{product_id}", response_model=Product)
async def get_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    """Get product by ID"""
    product = service.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
```

```python
# app/products/service.py
from sqlalchemy.orm import Session
from app.products.models import Product, ProductSpecification
from app.products.schemas import ProductCreate
from uuid import uuid4

def create_product(db: Session, product: ProductCreate, seller_id: str):
    db_product = Product(
        id=str(uuid4()),
        seller_id=seller_id,
        name=product.name,
        grade=product.grade,
        origin=product.origin,
        # ... other fields
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Product).offset(skip).limit(limit).all()

def get_product(db: Session, product_id: str):
    return db.query(Product).filter(Product.id == product_id).first()
```

### 11.4 Coding Standards

**Python Style**:
- Follow PEP 8 style guide
- Use type hints everywhere
- Maximum line length: 120 characters
- Use meaningful variable names

**Best Practices**:
- Use async/await for all I/O operations
- Write docstrings for all functions
- Keep functions small and focused
- Use Pydantic for validation
- Use dependency injection
- Log important operations
- Handle errors gracefully

**Example**:
```python
async def create_order(
    db: Session,
    order: OrderCreate,
    current_user: dict
) -> Order:
    """
    Create a new order.
    
    Args:
        db: Database session
        order: Order creation data
        current_user: Authenticated user info
    
    Returns:
        Created order object
    
    Raises:
        HTTPException: If product not found or insufficient stock
    """
    # Validate product exists
    product = db.query(Product).filter(Product.id == order.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Create order
    db_order = Order(
        id=str(uuid4()),
        order_number=generate_order_number(),
        buyer_id=current_user["sub"],
        seller_id=product.seller_id,
        product_id=order.product_id,
        quantity=order.quantity,
        # ... other fields
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    logger.info(
        "Order created",
        extra={
            "order_id": db_order.id,
            "buyer_id": current_user["sub"],
            "product_id": order.product_id
        }
    )
    
    return db_order
```

### 11.5 Git Workflow

**Branch Naming**:
- `feature/user-authentication`
- `fix/order-validation`
- `refactor/qc-service`
- `docs/api-documentation`

**Commit Messages**:
```
feat: add user registration endpoint
fix: resolve order status update bug
refactor: simplify product search logic
docs: update API documentation
test: add tests for QC service
```

**Pull Request Process**:
1. Create feature branch from `main`
2. Implement feature with tests
3. Run tests locally: `pytest`
4. Push and create PR
5. Code review (at least 1 approval)
6. CI/CD runs automatically
7. Merge to `main`
8. Auto-deploy to staging/production

---

## 12. API Documentation

FastAPI provides automatic interactive API documentation:

**Access Documentation**:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

The documentation is automatically generated from:
- Route definitions
- Pydantic schemas
- Docstrings
- Response models

**Example Enhanced Documentation**:
```python
from fastapi import APIRouter
from typing import List
from app.products.schemas import Product, ProductCreate

router = APIRouter(prefix="/api/v1/products", tags=["Products"])

@router.post(
    "/",
    response_model=Product,
    status_code=201,
    summary="Create a new product",
    description="Create a new product listing. Only sellers and admins can create products.",
    response_description="The created product",
)
async def create_product(product: ProductCreate):
    """
    Create a new product with the following information:
    
    - **name**: Product name (e.g., Raw Cashew Nuts)
    - **grade**: Product grade (e.g., W240, W320)
    - **origin**: Country of origin
    - **price_per_kg**: Price per kilogram in USD
    - **specifications**: Detailed product specifications
    """
    pass
```

---

## 13. Performance & Optimization

### 13.1 Database Optimization

**Query Optimization**:
```python
# Use indexes
from sqlalchemy import Index

class Product(Base):
    __tablename__ = "products"
    
    id = Column(UUID, primary_key=True)
    seller_id = Column(UUID, index=True)  # Indexed for fast lookups
    status = Column(String, index=True)
    origin = Column(String, index=True)
    
    __table_args__ = (
        Index('idx_products_seller_status', 'seller_id', 'status'),
        Index('idx_products_search', 'name', 'grade', 'origin'),
    )

# Use joins instead of separate queries
def get_orders_with_products(db: Session):
    return db.query(Order).options(
        joinedload(Order.product),
        joinedload(Order.buyer)
    ).all()

# Pagination
def get_products_paginated(db: Session, page: int = 1, size: int = 50):
    offset = (page - 1) * size
    return db.query(Product).offset(offset).limit(size).all()
```

**Connection Pooling**:
```python
# app/core/database.py
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # Verify connections before using
    pool_size=10,            # Maintain 10 connections
    max_overflow=20,         # Allow up to 20 additional connections
    pool_recycle=3600,       # Recycle connections after 1 hour
)
```

### 13.2 API Response Optimization

**Response Models**:
```python
# Use specific response models (don't return entire objects)
class ProductListItem(BaseModel):
    id: str
    name: str
    grade: str
    price_per_kg: float
    # Exclude heavy fields like full specifications

class ProductDetail(BaseModel):
    id: str
    name: str
    grade: str
    price_per_kg: float
    specifications: dict  # Include full details only when needed
    images: list
```

**Compression**:
```python
from fastapi.middleware.gzip import GZipMiddleware

app.add_middleware(GZipMiddleware, minimum_size=1000)
```

---

## 14. Security Checklist

### 14.1 Must-Have Security Measures (v1)

✅ **Authentication & Authorization**:
- [x] JWT tokens with secure secret key
- [x] Password hashing (bcrypt)
- [x] Role-based access control
- [x] Token expiration (60 minutes)

✅ **Input Validation**:
- [x] Pydantic validation on all inputs
- [x] SQL injection prevention (SQLAlchemy parameterized queries)
- [x] XSS prevention (FastAPI default escaping)

✅ **Network Security**:
- [x] HTTPS only (enforced via Nginx)
- [x] CORS properly configured
- [x] Rate limiting (simple in-memory)

✅ **Data Protection**:
- [x] Environment variables for secrets
- [x] No secrets in code/git
- [x] Database connection encryption (SSL)

✅ **Monitoring**:
- [x] Structured logging
- [x] Error tracking
- [x] Health checks

### 14.2 Security Best Practices

```python
# Environment variables - NEVER commit these
# .env.example (template only)
JWT_SECRET_KEY=change-this-to-random-string
DATABASE_URL=postgresql://...
OPENROUTER_API_KEY=your-key-here

# Generate strong JWT secret
import secrets
print(secrets.token_urlsafe(32))
```

---

## 15. Migration from Monolith to Microservices (Future)

When you outgrow the modular monolith (thousands of requests/second, multiple teams, etc.), here's how to migrate:

### 15.1 Extraction Steps

**Step 1: Choose a module to extract** (e.g., `orders/`)

**Step 2: Create new service repo**
```bash
mkdir orders-service
cd orders-service

# Copy module
cp -r ../backend/app/orders ./app/
cp -r ../backend/app/core ./app/  # Shared code

# Create new main.py
cat > app/main.py << 'EOF'
from fastapi import FastAPI
from app.orders.router import router

app = FastAPI(title="Orders Service")
app.include_router(router)
EOF
```

**Step 3: Replace internal calls with HTTP**
```python
# Before (in monolith):
from app.products.service import get_product
product = get_product(db, product_id)

# After (in microservice):
import httpx
async with httpx.AsyncClient() as client:
    response = await client.get(f"http://product-service:8002/api/v1/products/{product_id}")
    product = response.json()
```

**Step 4: Deploy independently**
```yaml
# docker-compose.yml
services:
  orders-service:
    build: ./orders-service
    ports:
      - "8004:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - PRODUCT_SERVICE_URL=http://product-service:8002
```

**Step 5: Add API Gateway**
```yaml
# Kong configuration
services:
  - name: orders-service
    url: http://orders-service:8000
    routes:
      - paths: ["/api/v1/orders"]
```

### 15.2 When to Migrate

✅ **Migrate when**:
- Multiple teams working on codebase
- Different scaling needs per module
- Deployment independence required
- 10,000+ requests/second

❌ **Don't migrate if**:
- Single team
- Low traffic
- Rapid iteration needed
- Cost is a concern

---

## 16. Useful Commands & Scripts

### 16.1 Development

```bash
# Start development server
uvicorn app.main:app --reload --port 8000

# Run with Docker
docker-compose up

# Run tests
pytest
pytest -v  # Verbose
pytest tests/test_users.py  # Specific file
pytest -k "test_create"  # Specific test pattern

# Database migrations
alembic revision --autogenerate -m "Add users table"
alembic upgrade head
alembic downgrade -1

# Code formatting
black app/
isort app/

# Linting
flake8 app/
mypy app/
```

### 16.2 Production

```bash
# Deploy
git pull
docker-compose down
docker-compose build
docker-compose up -d

# View logs
docker-compose logs -f
docker-compose logs -f backend

# Database backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Check health
curl https://api.ompoi.com/health

# Restart service
systemctl restart ompoi-backend
```

---

## 17. Troubleshooting

### Common Issues

**Database Connection Issues**:
```bash
# Check connectivity
psql $DATABASE_URL

# Check pool
# Look for "too many connections" in logs
# Solution: Increase pool_size or max_overflow
```

**JWT Token Issues**:
```python
# Verify token
import jwt
token = "your-token"
secret = "your-secret"
payload = jwt.decode(token, secret, algorithms=["HS256"])
print(payload)
```

**CORS Issues**:
```python
# Add specific origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Be specific
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 18. Resources & References

### Documentation
- **FastAPI**: https://fastapi.tiangolo.com/
- **SQLAlchemy**: https://docs.sqlalchemy.org/
- **Alembic**: https://alembic.sqlalchemy.org/
- **NeonDB**: https://neon.tech/docs
- **OpenRouter**: https://openrouter.ai/docs

### Libraries
- **FastAPI**: Web framework
- **SQLAlchemy**: ORM
- **Pydantic**: Data validation
- **PyJWT**: JWT handling
- **Passlib**: Password hashing
- **Alembic**: Database migrations
- **Pytest**: Testing framework
- **OpenAI**: OpenRouter client

### Community
- **FastAPI Discord**: https://discord.gg/VQjSZaeJmf
- **Stack Overflow**: Tag with `fastapi`

---

## 19. Final Notes

### What We Built (v1)
✅ Modular monolith FastAPI application  
✅ 7 domain modules (users, products, orders, qc, ai, notifications, admin)  
✅ NeonDB PostgreSQL database  
✅ JWT authentication with RBAC  
✅ 5 AI services via OpenRouter  
✅ Simple logging and monitoring  
✅ Docker deployment  
✅ API documentation  

### What We Deferred (v2+)
❌ Separate microservices  
❌ API Gateway (Kong/Traefik)  
❌ Message queue (RabbitMQ)  
❌ Prometheus + Grafana  
❌ Kubernetes orchestration  
❌ Inventory management service  
❌ Full payment gateway integration  
❌ Advanced analytics service  

### Next Steps
1. **Week 1**: Setup & Users module
2. **Week 2-3**: Products, Orders, QC modules
3. **Week 4**: AI integration
4. **Week 5**: Admin & polish
5. **Week 6**: Deploy & launch

### Success Metrics
- API response time < 200ms
- 99.9% uptime
- Handle 1000+ requests/minute
- Zero security incidents
- < $500/month infrastructure cost

---

**Document Version**: 2.0 (Modular Monolith)  
**Last Updated**: December 5, 2025  
**Status**: Ready for Implementation  
**Architecture**: Modular Monolith (Microservice-Ready)
