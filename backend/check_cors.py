from app.core.config import settings

print("="*60)
print("CORS CONFIGURATION CHECK")
print("="*60)
print(f"BACKEND_CORS_ORIGINS: {settings.BACKEND_CORS_ORIGINS}")
print(f"Type: {type(settings.BACKEND_CORS_ORIGINS)}")
print(f"Length: {len(settings.BACKEND_CORS_ORIGINS) if settings.BACKEND_CORS_ORIGINS else 0}")
print("="*60)
