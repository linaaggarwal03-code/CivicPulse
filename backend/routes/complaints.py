from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models.complaint import Complaint
from schemas.complaint import ComplaintCreate, ComplaintResponse
from services.complaint_service import analyze_complaint

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/complaints", response_model=ComplaintResponse)
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    analysis = analyze_complaint(complaint.description)

    new_complaint = Complaint(
        description=complaint.description,
        latitude=complaint.latitude,
        longitude=complaint.longitude,
        category=analysis["category"],
        severity=analysis["severity"]
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return new_complaint


@router.get("/complaints", response_model=list[ComplaintResponse])
def get_complaints(db: Session = Depends(get_db)):
    return db.query(Complaint).all()


@router.get("/complaints/{complaint_id}", response_model=ComplaintResponse)
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:
        return {"error": "Complaint not found"}

    return complaint