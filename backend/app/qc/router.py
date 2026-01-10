from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.core.database import get_db
from app.users import deps
from app.qc import service, schemas
from app.activity.service import log_activity
from app.common.responses import success_response

router = APIRouter()

@router.post("/inspections", response_model=schemas.QCInspectionResponse)
def create_inspection(
    inspection_in: schemas.QCInspectionCreate,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new QC inspection"""
    inspection = service.create_inspection(db, inspection_in)
    
    log_activity(
        db=db,
        action="create_qc_inspection",
        module="qc",
        user_id=current_user.id,
        record_id=inspection.id,
        metadata={"order_id": str(inspection.order_id)}
    )
    
    return inspection

@router.get("/inspections/order/{order_id}", response_model=List[schemas.QCInspectionResponse])
def get_inspections_by_order(
    order_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Get all inspections for an order"""
    return service.get_inspections_by_order(db, order_id)

@router.get("/inspections/agent/{agent_id}", response_model=List[schemas.QCInspectionResponse])
def get_inspections_by_agent(
    agent_id: UUID,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Get all inspections assigned to an agent"""
    return service.get_inspections_by_agent(db, agent_id, skip, limit)

@router.get("/inspections/{inspection_id}", response_model=schemas.QCInspectionResponse)
def get_inspection(
    inspection_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """Get inspection details"""
    inspection = service.get_inspection(db, inspection_id)
    if not inspection:
        from app.common.exceptions import NotFoundError
        raise NotFoundError("QC Inspection", str(inspection_id))
    return inspection

@router.put("/inspections/{inspection_id}", response_model=schemas.QCInspectionResponse)
def update_inspection(
    inspection_id: UUID,
    inspection_in: schemas.QCInspectionUpdate,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update inspection"""
    inspection = service.update_inspection(db, inspection_id, inspection_in)
    
    log_activity(
        db=db,
        action="update_qc_inspection",
        module="qc",
        user_id=current_user.id,
        record_id=inspection.id
    )
    
    return inspection

@router.post("/reports", response_model=schemas.QCReportResponse)
def create_report(
    report_in: schemas.QCReportCreate,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a QC report"""
    report = service.create_report(db, report_in)
    
    log_activity(
        db=db,
        action="create_qc_report",
        module="qc",
        user_id=current_user.id,
        record_id=report.id,
        metadata={"inspection_id": str(report.inspection_id)}
    )
    
    return report

@router.post("/inspections/{inspection_id}/approve", response_model=schemas.QCInspectionResponse)
def approve_inspection(
    inspection_id: UUID,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Approve a QC inspection"""
    inspection = service.approve_inspection(db, inspection_id, current_user.id)
    
    log_activity(
        db=db,
        action="approve_qc_inspection",
        module="qc",
        user_id=current_user.id,
        record_id=inspection.id
    )
    
    return inspection

@router.post("/inspections/{inspection_id}/reject", response_model=schemas.QCInspectionResponse)
def reject_inspection(
    inspection_id: UUID,
    reason: str = None,
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Reject a QC inspection"""
    inspection = service.reject_inspection(db, inspection_id, current_user.id, reason)
    
    log_activity(
        db=db,
        action="reject_qc_inspection",
        module="qc",
        user_id=current_user.id,
        record_id=inspection.id,
        metadata={"reason": reason}
    )
    
    return inspection
