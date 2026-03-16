from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db
from models.space_models import Planet, Star, Galaxy, SpaceMission, Satellite

router = APIRouter(prefix="/space-db", tags=["space-database"])

@router.get("/planets")
async def get_planets(db: Session = Depends(get_db)):
    return db.query(Planet).all()

@router.get("/stars")
async def get_stars(db: Session = Depends(get_db)):
    return db.query(Star).all()

@router.get("/galaxies")
async def get_galaxies(db: Session = Depends(get_db)):
    return db.query(Galaxy).all()

@router.get("/missions")
async def get_missions(db: Session = Depends(get_db)):
    return db.query(SpaceMission).all()

@router.get("/satellites")
async def get_satellites(db: Session = Depends(get_db)):
    return db.query(Satellite).all()
