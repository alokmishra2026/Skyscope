from models.space_models import Planet
from models.database import SessionLocal
import random
from app.services import nasa_service as nasa
from app.services import isro_service as isro

def get_ai_response(query: str):
    db = SessionLocal()
    query = query.lower()
    
    # Scientific explanations search
    planet = db.query(Planet).filter(Planet.name.ilike(f"%{query}%")).first()
    
    if planet:
        response = f"As your Space Mentor, I can tell you that {planet.name} is a fascinating world. {planet.description} It has a gravity of {planet.gravity} m/s² and its mass is approximately {planet.mass}."
        return {
            "response": response,
            "images": ["https://images-assets.nasa.gov/image/PIA23122/PIA23122~medium.jpg"],
            "source": "Vyomveda Knowledge Base"
        }
    
    # NASA API Integration
    if "apod" in query or "picture of the day" in query:
        data = nasa.get_apod()
        if data:
            return {
                "response": f"Behold! This is NASA's Astronomy Picture of the Day: {data.get('title')}. {data.get('explanation')[:200]}...",
                "images": [data.get("url")],
                "source": "NASA APOD"
            }
    
    if "mars" in query and "photo" in query:
        photos = nasa.get_mars_rover_photos()
        if photos:
            return {
                "response": "Scanning the red planet... Here are some recent captures from the Mars rovers.",
                "images": [p.get("img_src") for p in photos[:3]],
                "source": "NASA Mars Rover"
            }

    if "search" in query or "image" in query or "photo" in query:
        search_results = nasa.search_nasa_library(query.replace("search", "").replace("image", "").strip())
        if search_results:
            images = [item.get("links", [{}])[0].get("href") for item in search_results if item.get("links")]
            return {
                "response": f"I've searched the NASA archives for '{query}'. Here's what I found in the cosmic gallery.",
                "images": images,
                "source": "NASA Image Library"
            }

    # ISRO API Integration
    if "isro" in query or "india" in query or "chandrayaan" in query:
        missions = isro.get_isro_missions()
        if missions:
            latest = missions[-1]
            return {
                "response": f"ISRO has been making incredible strides! The latest recorded mission is {latest.get('name')}. India's space program is truly inspiring.",
                "images": ["https://www.isro.gov.in/media_isro/generic/logo.png"],
                "source": "ISRO Missions"
            }
    # Generic AI responses
    responses = [
        "Space is vast and full of wonders! Ask me about specific planets, stars, or black holes.",
        "That's a great question for a future explorer! I'm currently scanning the cosmos for more data on that.",
        "Did you know that the universe is approximately 13.8 billion years old? Keep exploring!"
    ]
    
    db.close()
    return {
        "response": random.choice(responses),
        "images": [],
        "source": "Vyomveda Space AI"
    }
