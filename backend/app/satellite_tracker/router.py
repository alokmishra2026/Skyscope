from fastapi import APIRouter
import random

router = APIRouter(prefix="/satellites", tags=["satellite-tracker"])

@router.get("/live")
async def get_live_satellites():
    # Mock data for live satellites
    sats = [
        {"id": 1, "name": "ISS (ZARYA)", "lat": random.uniform(-90, 90), "lng": random.uniform(-180, 180), "alt": 408, "velocity": 27600},
        {"id": 2, "name": "HUBBLE", "lat": random.uniform(-90, 90), "lng": random.uniform(-180, 180), "alt": 540, "velocity": 27300},
        {"id": 3, "name": "STARLINK-30421", "lat": random.uniform(-90, 90), "lng": random.uniform(-180, 180), "alt": 550, "velocity": 27000}
    ]
    return sats
