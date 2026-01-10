from sqlalchemy.orm import Session
from app.qc.models import QCInspection, QCReport
from app.qc.schemas import QCInspectionCreate, QCInspectionUpdate, QCReportCreate
from app.common.exceptions import NotFoundError, ForbiddenError
from uuid import UUID
from typing import Optional, List

def get_inspection(db: Session, inspection_id: UUID) -> Optional[QCInspection]:
    return db.query(QCInspection).filter(QCInspection.id == inspection_id).first()

def get_inspections_by_order(db: Session, order_id: UUID) -> List[QCInspection]:
    return db.query(QCInspection).filter(QCInspection.order_id == order_id).all()

def get_inspections_by_agent(db: Session, agent_id: UUID, skip: int = 0, limit: int = 100) -> List[QCInspection]:
    return db.query(QCInspection).filter(QCInspection.agent_id == agent_id)\
        .order_by(QCInspection.created_at.desc()).offset(skip).limit(limit).all()

def create_inspection(db: Session, inspection_in: QCInspectionCreate) -> QCInspection:
    db_inspection = QCInspection(
        order_id=inspection_in.order_id,
        agent_id=inspection_in.agent_id,
        inspection_date=inspection_in.inspection_date,
        location=inspection_in.location,
        sample_size=inspection_in.sample_size,
        sample_unit=inspection_in.sample_unit,
        notes=inspection_in.notes,
        status='pending'
    )
    db.add(db_inspection)
    db.commit()
    db.refresh(db_inspection)
    return db_inspection

def update_inspection(
    db: Session, 
    inspection_id: UUID, 
    inspection_in: QCInspectionUpdate
) -> QCInspection:
    inspection = get_inspection(db, inspection_id)
    if not inspection:
        raise NotFoundError("QC Inspection", str(inspection_id))
    
    update_data = inspection_in.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(inspection, key, value)
        
    db.commit()
    db.refresh(inspection)
    return inspection

def create_report(db: Session, report_in: QCReportCreate) -> QCReport:
    # Check if inspection exists
    inspection = get_inspection(db, report_in.inspection_id)
    if not inspection:
        raise NotFoundError("QC Inspection", str(report_in.inspection_id))
    
    db_report = QCReport(
        inspection_id=report_in.inspection_id,
        nut_count=report_in.nut_count,
        moisture_content=report_in.moisture_content,
        out_turn=report_in.out_turn,
        defective_percentage=report_in.defective_percentage,
        broken_percentage=report_in.broken_percentage,
        color=report_in.color,
        size_uniformity=report_in.size_uniformity,
        foreign_matter=report_in.foreign_matter,
        test_results=report_in.test_results,
        recommendations=report_in.recommendations
    )
    db.add(db_report)
    
    # Update inspection status
    inspection.status = 'completed'
    
    db.commit()
    db.refresh(db_report)
    return db_report

def approve_inspection(db: Session, inspection_id: UUID, user_id: UUID) -> QCInspection:
    inspection = get_inspection(db, inspection_id)
    if not inspection:
        raise NotFoundError("QC Inspection", str(inspection_id))
    
    inspection.status = 'approved'
    inspection.pass_fail = True
    
    if inspection.report:
        from datetime import datetime
        inspection.report.approved_by = user_id
        inspection.report.approved_at = datetime.utcnow()
    
    db.commit()
    db.refresh(inspection)
    return inspection

def reject_inspection(db: Session, inspection_id: UUID, user_id: UUID, reason: str = None) -> QCInspection:
    inspection = get_inspection(db, inspection_id)
    if not inspection:
        raise NotFoundError("QC Inspection", str(inspection_id))
    
    inspection.status = 'rejected'
    inspection.pass_fail = False
    if reason:
        inspection.notes = f"{inspection.notes or ''}\nRejection reason: {reason}"
    
    db.commit()
    db.refresh(inspection)
    return inspection
