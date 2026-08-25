from pydantic import BaseModel


class ComplaintCreate(BaseModel):
    description: str
    latitude: float
    longitude: float


class ComplaintResponse(BaseModel):
    id: int
    description: str
    latitude: float
    longitude: float
    category: str | None = None
    severity: str | None = None