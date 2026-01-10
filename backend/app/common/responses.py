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
