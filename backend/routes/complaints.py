from fastapi import APIRouter
from schemas.complaint import ComplaintCreate
from services.complaint_service import analyze_complaint

router = APIRouter()

complaints = []


@router.post("/complaints")
def create_complaint(complaint: ComplaintCreate):
    analysis = analyze_complaint(complaint.description)

    complaints.append({
        "description": complaint.description,
        "latitude": complaint.latitude,
        "longitude": complaint.longitude,
        "analysis": analysis
    })

    return {
        "message": "Complaint received successfully",
        "complaint": complaints[-1]
    }


@router.get("/complaints")
def get_complaints():
    return {
        "count": len(complaints),
        "complaints": complaints
    }


@router.get("/complaints/{complaint_id}")
def get_complaint(complaint_id: int):
    if complaint_id < 0 or complaint_id >= len(complaints):
        return {"error": "Complaint not found"}

    return complaints[complaint_id]