from pydantic import BaseModel


class ComplaintCreate(BaseModel):
    description: str
    latitude: float
    longitude: float