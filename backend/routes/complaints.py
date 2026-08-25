from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models.complaint import Complaint
from schemas.complaint import ComplaintCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/complaints")
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    new_complaint = Complaint(
        description=complaint.description,
        latitude=complaint.latitude,
        longitude=complaint.longitude
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return {
        "message": "Complaint received successfully",
        "complaint": {
            "id": new_complaint.id,
            "description": new_complaint.description,
            "latitude": new_complaint.latitude,
            "longitude": new_complaint.longitude
        }
    }


@router.get("/complaints")
def get_complaints(db: Session = Depends(get_db)):
    complaints = db.query(Complaint).all()

    return {
        "count": len(complaints),
        "complaints": [
            {
                "id": complaint.id,
                "description": complaint.description,
                "latitude": complaint.latitude,
                "longitude": complaint.longitude
            }
            for complaint in complaints
        ]
    }


@router.get("/complaints/{complaint_id}")
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:
        return {"error": "Complaint not found"}

    return {
        "id": complaint.id,
        "description": complaint.description,
        "latitude": complaint.latitude,
        "longitude": complaint.longitude
    }