# OMPOI Backend - Pre-Development Checklist

## ✅ ALL 5 CRITICAL FIXES APPLIED

### 1. ✅ Added `common/` Utilities Layer
- [x] Created `/app/common/` directory
- [x] `exceptions.py` - Custom exception classes
- [x] `responses.py` - Standard API responses
- [x] `utils.py` - Helper functions
- [x] `email_client.py` - SMTP client
- [x] `ai_client.py` - OpenRouter client with rate limiting

**Why Critical**: Without this, every module duplicates code → unmaintainable monolith

---

### 2. ✅ Complete CORS Configuration
- [x] Production subdomains (buyer, seller, agent, admin)
- [x] Staging subdomains (*-staging)
- [x] Development ports (Next.js: 3000-3003)
- [x] Development ports (Vite: 5173-5176)
- [x] Environment-specific origins
- [x] Credentials support

**Why Critical**: Frontend will fail without proper CORS setup

---

### 3. ✅ Added `broker_id` to Orders
- [x] `orders.broker_id` column (UUID, nullable)
- [x] `orders.order_source` column (buyer/seller/broker)
- [x] Foreign key to `users(id)`
- [x] Index on `broker_id`
- [x] Migration script ready

**Why Critical**: OMPOI's business model requires agent/broker tracking

---

### 4. ✅ AI Rate Limiting Protection
- [x] Global limit: 20 calls/minute
- [x] Per-user limit: 200 calls/day
- [x] Rate limit checking in AI client
- [x] User usage stats tracking
- [x] Proper error messages (429)
- [x] Usage stats in API responses

**Why Critical**: Without this, one misclick → ₹3,000+ bill

---

### 5. ✅ Activity Logs Module
- [x] `/app/activity/` module created
- [x] `activity_logs` table
- [x] Log service functions
- [x] Admin-only endpoints
- [x] Indexes on user_id, module, created_at
- [x] Integration examples provided

**Why Critical**: Required for disputes, compliance, fraud detection, UEF regulations

---

## 🚀 READY TO START DEVELOPMENT

### Pre-Development Setup Checklist

#### Environment Setup
- [ ] Python 3.11+ installed
- [ ] PostgreSQL client installed (for NeonDB)
- [ ] Docker & Docker Compose installed
- [ ] Git repository initialized
- [ ] Virtual environment created

#### Database Setup
- [ ] NeonDB account created
- [ ] Database created: `ompoi_db`
- [ ] Connection string obtained
- [ ] SSL mode verified (required)

#### API Keys & Secrets
- [ ] OpenRouter API key obtained
- [ ] JWT secret key generated (32+ chars)
- [ ] SMTP credentials (Gmail/SendGrid)
- [ ] All keys stored in `.env` (NOT git)

#### Project Structure
- [ ] Clone/create repository
- [ ] Copy folder structure from spec
- [ ] Create all module directories
- [ ] Create all `__init__.py` files
- [ ] Setup `requirements.txt`

---

## 📋 Development Start Checklist

### Week 1: Foundation
- [ ] **Day 1**: Project setup + NeonDB connection
- [ ] **Day 2**: Core infrastructure (config, security, database)
- [ ] **Day 3**: Common utilities (exceptions, responses, utils)
- [ ] **Day 4**: Users module (auth, JWT, RBAC)
- [ ] **Day 5**: Activity logs module
- [ ] **Day 6**: Write unit tests
- [ ] **Day 7**: Docker setup + documentation

### Health Check Endpoints
- [ ] `/health` - Basic health check
- [ ] `/health/db` - Database connectivity
- [ ] `/health/ai` - OpenRouter connectivity
- [ ] `/metrics` - Basic metrics (optional)

### Basic Tests Required
- [ ] User registration works
- [ ] User login returns JWT
- [ ] JWT authentication works
- [ ] Role-based access works
- [ ] Activity logs are created
- [ ] Rate limiting works
- [ ] CORS works from localhost:3000

---

## 🔒 Security Checklist

### Authentication & Authorization
- [x] JWT with secure secret key
- [x] Password hashing (bcrypt)
- [x] Role-based access control (RBAC)
- [x] Token expiration (60 minutes)
- [ ] Refresh token mechanism (optional v1)

### API Security
- [x] CORS properly configured
- [x] Rate limiting (global + AI-specific)
- [x] Input validation (Pydantic)
- [x] SQL injection prevention (SQLAlchemy)
- [ ] HTTPS enforced (via Nginx in production)

### Data Protection
- [x] Environment variables for secrets
- [x] No secrets in code/git
- [x] Database SSL connection
- [ ] Sensitive data logging excluded

### Audit & Compliance
- [x] Activity logging implemented
- [x] User actions tracked
- [x] IP address logging
- [ ] GDPR compliance reviewed (if EU users)

---

## 📊 Code Quality Standards

### Python Standards
- [ ] Follow PEP 8 style guide
- [ ] Use type hints everywhere
- [ ] Maximum line length: 120 characters
- [ ] Use meaningful variable names
- [ ] Write docstrings for all functions

### Git Workflow
- [ ] Branch naming: `feature/`, `fix/`, `refactor/`
- [ ] Commit messages: `feat:`, `fix:`, `docs:`, `test:`
- [ ] Pull requests require 1 approval
- [ ] CI/CD runs on all PRs

### Testing Requirements
- [ ] Unit tests for all modules
- [ ] Integration tests for API flows
- [ ] Test coverage > 70%
- [ ] All tests pass before merge

---

## 🛠️ Development Tools Setup

### Required Dependencies
```bash
# Core
fastapi[all]
uvicorn[standard]
python-multipart

# Database
sqlalchemy
psycopg2-binary
alembic

# Security
python-jose[cryptography]
passlib[bcrypt]
python-multipart

# AI
openai  # For OpenRouter

# Validation
pydantic
pydantic-settings

# Testing
pytest
pytest-asyncio
httpx

# Development
black  # Code formatting
isort  # Import sorting
flake8  # Linting
mypy  # Type checking
```

### VS Code Extensions (Recommended)
- Python
- Pylance
- SQLTools
- Docker
- GitLens
- REST Client

---

## 📦 Docker Setup Checklist

### Dockerfile
- [ ] Uses Python 3.11-slim
- [ ] Installs system dependencies
- [ ] Copies requirements.txt first (caching)
- [ ] Copies application code
- [ ] Exposes port 8000
- [ ] Runs Alembic migrations on start

### docker-compose.yml
- [ ] Backend service configured
- [ ] Environment variables from .env
- [ ] Volume mounts for development
- [ ] Port mapping (8000:8000)
- [ ] Health checks configured

---

## 🚦 API Endpoint Verification

### Must Work Before Week 2
```bash
# Health
curl http://localhost:8000/health

# Register user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","role":"buyer"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Get profile (with JWT token)
curl http://localhost:8000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📚 Documentation Requirements

### Code Documentation
- [ ] README.md with setup instructions
- [ ] API documentation (auto-generated by FastAPI)
- [ ] Database schema diagram
- [ ] Environment variables documented
- [ ] Deployment guide

### API Documentation
- [ ] All endpoints have descriptions
- [ ] Request/response examples
- [ ] Error response formats
- [ ] Authentication requirements noted

---

## 🎯 Success Criteria (Week 1)

### Technical
- ✅ All 5 critical fixes applied
- [ ] Docker container runs successfully
- [ ] Database migrations work
- [ ] All endpoints respond correctly
- [ ] Tests pass (>70% coverage)
- [ ] No security vulnerabilities

### Functional
- [ ] User can register
- [ ] User can login and get JWT
- [ ] JWT authentication works
- [ ] Role-based access works
- [ ] Activity logs are created
- [ ] CORS works from frontend

### Documentation
- [ ] API docs accessible at `/docs`
- [ ] README has setup instructions
- [ ] Environment variables documented
- [ ] Database schema documented

---

## ⚠️ Common Pitfalls to Avoid

### Database
- ❌ Don't use synchronous SQLAlchemy (use async)
- ❌ Don't forget database indexes
- ❌ Don't skip migrations (always use Alembic)
- ❌ Don't hardcode connection strings

### Security
- ❌ Don't commit `.env` file
- ❌ Don't use weak JWT secrets
- ❌ Don't skip input validation
- ❌ Don't log sensitive data

### Code Quality
- ❌ Don't skip type hints
- ❌ Don't duplicate code (use `common/`)
- ❌ Don't skip error handling
- ❌ Don't write untestable code

### Architecture
- ❌ Don't import between modules directly
- ❌ Don't skip activity logging
- ❌ Don't forget rate limiting
- ❌ Don't mix business logic in routes

---

## 🎉 You're Ready to Start!

### Next Steps:
1. **Now**: Review this checklist with your team
2. **Today**: Setup development environment
3. **Tomorrow**: Start Week 1 implementation
4. **Week 1 End**: Have working auth + basic structure
5. **Week 6**: Production launch!

### Questions Before Starting?
- Database schema: ✅ Defined
- API endpoints: ✅ Defined
- Project structure: ✅ Defined
- Security measures: ✅ Defined
- Rate limiting: ✅ Defined
- Activity logging: ✅ Defined

### Everything is documented in:
- `OMPOI_Backend_Technical_Specification.md` (full spec)
- `OMPOI_Backend_Quick_Reference.md` (quick lookup)
- This checklist (pre-development)

---

## 🔥 START DEVELOPMENT NOW!

All critical issues are fixed. All requirements are clear. All documentation is ready.

**Time to code!** 🚀
