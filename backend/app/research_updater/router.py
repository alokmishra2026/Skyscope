from fastapi import APIRouter
import requests

router = APIRouter(prefix="/research", tags=["research-updater"])

NASA_APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"

@router.get("/updates")
async def get_research_updates():
    try:
        response = requests.get(NASA_APOD_URL)
        if response.status_code == 200:
            data = response.json()
            return {
                "latest_discovery": data.get("title"),
                "description": data.get("explanation"),
                "image": data.get("url"),
                "date": data.get("date")
            }
    except Exception:
        pass
    
    return {
        "latest_discovery": "James Webb Telescope Update",
        "description": "The telescope has spotted a new cluster of ancient stars.",
        "image": "https://images-assets.nasa.gov/image/PIA23122/PIA23122~medium.jpg",
        "date": "2026-03-16"
    }
