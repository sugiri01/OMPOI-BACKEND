from fastapi import FastAPI, Request
# Force Reload for Config Update - Attempt 2
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.common.exceptions import OMPOIException
from app.users.router import router as users_router
from app.activity.router import router as activity_router
from app.products.router import router as products_router
from app.orders.router import router as orders_router
from app.qc.router import router as qc_router
from app.config.router import router as config_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS Configuration - Allow all localhost origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception Handler
@app.exception_handler(OMPOIException)
async def ompoi_exception_handler(request: Request, exc: OMPOIException):
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response(exc.message)
    )

# Include Routers
app.include_router(users_router, prefix=settings.API_V1_STR, tags=["users"])
app.include_router(activity_router, prefix=f"{settings.API_V1_STR}/activity", tags=["activity"])
app.include_router(products_router, prefix=f"{settings.API_V1_STR}/products", tags=["products"])
app.include_router(orders_router, prefix=f"{settings.API_V1_STR}/orders", tags=["orders"])
app.include_router(qc_router, prefix=f"{settings.API_V1_STR}/qc", tags=["qc"])
app.include_router(config_router, prefix=f"{settings.API_V1_STR}/config", tags=["config"])

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "1.0.0"}

@app.get("/")
def root():
    return {"message": "Welcome to OMPOI API"}
