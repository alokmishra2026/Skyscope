from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import get_db
from models.space_models import Course

router = APIRouter(prefix="/courses", tags=["space-courses"])

@router.get("/")
async def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

@router.get("/{course_id}")
async def get_course(course_id: int, db: Session = Depends(get_db)):
    return db.query(Course).filter(Course.id == course_id).first()
