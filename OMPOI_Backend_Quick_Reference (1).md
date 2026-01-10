# OMPOI Backend - Quick Reference Summary

## Architecture: Modular Monolith (Not Microservices)

### Why Modular Monolith?
- ✅ Faster development (single codebase)
- ✅ Easier debugging
- ✅ Lower infrastructure costs ($200-450/month vs $1000+)
- ✅ Simpler deployment (one container)
- ✅ Microservice-ready (can split later without rewrite)

---

## Technology Stack (Phase NOW)

| Component | Technology | Why |
|-----------|------------|-----|
| **Backend** | FastAPI (Python 3.11+) | Fast, modern, auto docs |
| **Architecture** | Modular Monolith | Simple, scalable, low cost |
| **Database** | NeonDB (PostgreSQL) | Serverless, auto-scaling |
| **Auth** | JWT (PyJWT + bcrypt) | Industry standard |
| **AI** | OpenRouter (Claude) | Flexible AI access |
| **Container** | Docker | Easy deployment |
| **Hosting** | VPS (4GB RAM) | Cost-effective |

---

## 7 Core Modules

```
backend/app/
├── users/          # Auth, profiles, roles
├── products/       # Product catalog, search
├── orders/         # Order management
├── qc/            # Quality control
├── ai/            # 5 AI services (OpenRouter)
├── notifications/ # Email/SMS
└── admin/         # Analytics, reports
```

---

## 5 Must-Have AI Services

1. **Product Description Generation** - Auto-generate listings
2. **Price Prediction** - Market price analysis
3. **Quality Analysis** - Analyze product images
4. **Contract Review** - Extract contract terms
5. **Market Insights** - Current market trends

---

## Database Schema (Essential Tables Only)

### Core Tables:
- `users` + `user_profiles` - Authentication & profiles
- `products` + `product_specifications` - Product catalog
- `orders` + `order_items` + `order_timeline` - Order management
- `qc_inspections` + `qc_reports` - Quality control
- `notifications` - Email/SMS notifications (optional)

### NOT Included in v1:
- ❌ `inventory` tables (can add later)
- ❌ `payments` tables (record in orders.payment_terms for now)
- ❌ `analytics_reports` (use live SQL queries)

---

## Development Timeline: 6 Weeks

| Week | Tasks | Deliverables |
|------|-------|--------------|
| **1** | Setup + Users module | Auth working, tests passing |
| **2** | Products module | Product CRUD + search |
| **3** | Orders + QC modules | Order flow + QC workflow |
| **4** | AI integration | 5 AI endpoints live |
| **5** | Admin + polish | Dashboard, security audit |
| **6** | Deploy + launch | Production live |

---

## Full Stack Startup Guide

**Recommendation:** Run each command in a separate terminal window/tab.

### 0. Cleanup (If ports are busy)
```powershell
# Kill processes on ports 8000, 3000, 3001, 3002
Get-NetTCPConnection -LocalPort 8000,3000,3001,3002 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### 1. Backend (Start First)
```bash
cd backend
# Windows:
venv\Scripts\activate
# Linux/Mac:
# source venv/bin/activate

# Run Server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Seller App (Frontend)
```bash
cd ompoi_frontend-main/seller
npm run dev
# Runs on http://localhost:3000
```

### 3. Buyer App (Frontend)
```bash
cd ompoi_frontend-main/buyer
npm run dev
# Likely runs on http://localhost:3001 (checks if 3000 is busy)
```

### 4. Admin App (Frontend)
```bash
cd ompoi_frontend-main/admin
npm run dev -- -p 3002
# Forced to run on http://localhost:3002
```

### Database Setup (If needed)
```bash
cd backend
venv\Scripts\activate
alembic upgrade head
```

---

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app
│   ├── core/                # Config, security, DB
│   ├── users/               # User module
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── service.py
│   ├── products/            # Product module
│   ├── orders/              # Orders module
│   ├── qc/                  # QC module
│   ├── ai/                  # AI module
│   ├── notifications/       # Notifications
│   └── admin/               # Admin & analytics
├── tests/
├── alembic/                 # DB migrations
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

---

## API Endpoints Overview

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login (get JWT)
- `GET /api/v1/users/profile` - Get profile

### Products
- `POST /api/v1/products` - Create product
- `GET /api/v1/products` - List products
- `GET /api/v1/products/{id}` - Get product
- `GET /api/v1/products/search` - Search

### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - List orders
- `GET /api/v1/orders/{id}` - Get order
- `PUT /api/v1/orders/{id}/status` - Update status

### QC
- `POST /api/v1/qc/inspections` - Create inspection
- `GET /api/v1/qc/inspections/order/{id}` - Get inspections
- `POST /api/v1/qc/inspections/{id}/approve` - Approve

### AI (OpenRouter)
- `POST /api/v1/ai/product-description` - Generate description
- `POST /api/v1/ai/price-prediction` - Predict price
- `POST /api/v1/ai/quality-analysis` - Analyze image
- `POST /api/v1/ai/contract-review` - Review contract
- `GET /api/v1/ai/market-insights` - Get insights

---

## Deployment (Simple VPS)

### Option 1: Manual Deployment
```bash
# On VPS
ssh user@server-ip
git clone <repo>
cd backend
docker-compose up -d
```

### Option 2: CI/CD (GitHub Actions)
- Push to `main` branch
- GitHub Actions runs tests
- Auto-deploys to VPS
- Runs migrations

### Nginx + SSL
```nginx
server {
    listen 80;
    server_name api.ompoi.com;
    
    location / {
        proxy_pass http://localhost:8000;
    }
}
```

```bash
# SSL with Let's Encrypt
certbot --nginx -d api.ompoi.com
```

---

## Environment Variables

```bash
# .env (REQUIRED)
DATABASE_URL=postgresql://...neon.tech/ompoi_db
JWT_SECRET_KEY=your-secret-key-here
OPENROUTER_API_KEY=sk-or-v1-xxxxx
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=anthropic/claude-3-sonnet-20240229

# Frontend URLs (for CORS)
FRONTEND_URL_BUYER=https://buyer.ompoi.com
FRONTEND_URL_SELLER=https://seller.ompoi.com
FRONTEND_URL_AGENT=https://agent.ompoi.com
FRONTEND_URL_ADMIN=https://admin.ompoi.com

# Optional
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## Cost Estimate

### Monthly Infrastructure:
- NeonDB: $50-100
- VPS (4GB RAM): $20-40
- OpenRouter API: $100-300
- Domain + SSL: $15
- **Total: ~$200-450/month**

### One-time Development:
- 2-3 Developers × 6 weeks
- **Total: $25,000-35,000**

---

## What We're NOT Doing (v1)

To keep things simple and cost-effective:

❌ Separate microservices  
❌ API Gateway (Kong/Traefik)  
❌ Message Queue (RabbitMQ)  
❌ Kubernetes orchestration  
❌ Prometheus + Grafana  
❌ Redis caching  
❌ Inventory management  
❌ Payment gateway integration  
❌ Advanced analytics  

**These can all be added in v2+ when needed!**

---

## Security Checklist

✅ JWT authentication with 60min expiry  
✅ Password hashing (bcrypt)  
✅ Role-based access control (RBAC)  
✅ HTTPS only (via Nginx)  
✅ CORS properly configured  
✅ SQL injection prevention (SQLAlchemy)  
✅ Input validation (Pydantic)  
✅ Rate limiting (simple)  
✅ Environment variables for secrets  
✅ Structured logging  

---

## Migration to Microservices (Later)

When you need to scale:

1. **Copy module** to new repo
2. **Add HTTP calls** instead of direct imports
3. **Deploy independently**
4. **Add API Gateway**

Example:
```python
# Before (monolith):
from app.products.service import get_product
product = get_product(db, product_id)

# After (microservice):
async with httpx.AsyncClient() as client:
    response = await client.get(
        f"http://product-service:8002/products/{product_id}"
    )
    product = response.json()
```

**No rewrite needed - just extraction!**

---

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_users.py

# Run tests matching pattern
pytest -k "test_create"
```

---

## Useful Links

- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **NeonDB Dashboard**: https://console.neon.tech
- **OpenRouter Dashboard**: https://openrouter.ai/keys

---

## Success Metrics (v1)

- ✅ API response time < 200ms
- ✅ Handle 1000+ requests/minute
- ✅ 99.9% uptime
- ✅ Infrastructure cost < $500/month
- ✅ Zero security incidents
- ✅ All tests passing

---

## Next Steps

1. **Now**: Review this spec with team
2. **Week 1**: Start with project setup + Users module
3. **Week 2-3**: Build core modules (Products, Orders, QC)
4. **Week 4**: Integrate AI services
5. **Week 5**: Admin dashboard + testing
6. **Week 6**: Deploy to production!

---

**Questions?** Refer to the full specification document for detailed implementation guidance.

**Remember**: Start simple, iterate fast, scale when needed!
