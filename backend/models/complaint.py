from sqlalchemy import Column, Integer, Float, Text, String
from database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    category = Column(String(100), nullable=True)
    severity = Column(String(50), nullable=True)