from typing import Optional, Dict, Any, List
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

# QC Inspection schemas
class QCInspectionBase(BaseModel):
    order_id: UUID
    agent_id: Optional[UUID] = None
    inspection_date: Optional[datetime] = None
    location: Optional[str] = None
    sample_size: Optional[float] = None
    sample_unit: str = "kg"
    notes: Optional[str] = None

class QCInspectionCreate(QCInspectionBase):
    pass

class QCInspectionUpdate(BaseModel):
    status: Optional[str] = None
    inspection_date: Optional[datetime] = None
    location: Optional[str] = None
    sample_size: Optional[float] = None
    overall_grade: Optional[str] = None
    pass_fail: Optional[bool] = None
    notes: Optional[str] = None
    images: Optional[List[str]] = None

# QC Report schemas
class QCReportBase(BaseModel):
    nut_count: Optional[str] = None
    moisture_content: Optional[float] = None
    out_turn: Optional[float] = None
    defective_percentage: Optional[float] = None
    broken_percentage: Optional[float] = None
    color: Optional[str] = None
    size_uniformity: Optional[str] = None
    foreign_matter: Optional[float] = None
    test_results: Optional[Dict[str, Any]] = None
    recommendations: Optional[str] = None

class QCReportCreate(QCReportBase):
    inspection_id: UUID

class QCReportResponse(QCReportBase):
    id: UUID
    inspection_id: UUID
    approved_by: Optional[UUID] = None
    approved_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        orm_mode = True

class QCInspectionResponse(QCInspectionBase):
    id: UUID
    status: str
    overall_grade: Optional[str] = None
    pass_fail: Optional[bool] = None
    images: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime
    report: Optional[QCReportResponse] = None

    class Config:
        orm_mode = True
