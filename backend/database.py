import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

PASSWORD = os.getenv("DATABASE_PASSWORD")

DATABASE_URL = URL.create(
    drivername="postgresql+psycopg",
    username="postgres",
    password=PASSWORD,
    host="localhost",
    port=5432,
    database="civicpulse",
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()