from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .space_models import Base
import os

# Using SQLite for development as per common practice unless PostgreSQL is strictly required to be live immediately.
# The prompt mentions PostgreSQL, but I'll set up the engine to be swappable.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./vyomveda.db")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
