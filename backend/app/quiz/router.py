from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import get_db
from models.space_models import Quiz
import json

router = APIRouter(prefix="/quizzes", tags=["ai-quiz-generator"])

@router.get("/")
async def get_quizzes(db: Session = Depends(get_db)):
    return db.query(Quiz).all()

@router.get("/daily")
async def get_daily_quiz():
    # Mock daily quiz
    return {
        "title": "Daily Space Challenge",
        "questions": [
            {"q": "What is the closest planet to the Sun?", "a": "Mercury"},
            {"q": "Which planet is known as the Red Planet?", "a": "Mars"}
        ]
    }
