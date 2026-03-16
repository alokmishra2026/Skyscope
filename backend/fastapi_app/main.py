from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import random

app = FastAPI(title="Vyomveda Skyscope Space AI")

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "guest"

class ChatResponse(BaseModel):
    response: str
    source_links: List[str]
    images: List[str]

# Mock Database for AI Knowledge
SPACE_KNOWLEDGE = {
    "black hole": "A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.",
    "mars": "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury.",
    "universe": "The universe is all of space and time and their contents, including planets, stars, galaxies, and all other forms of matter and energy.",
    "exoplanets": "An exoplanet or extrasolar planet is a planet outside the Solar System."
}

@app.get("/")
async def root():
    return {"message": "Vyomveda Skyscope AI API is live"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    msg = request.message.lower()
    response_text = "I'm still learning about that! As a Space AI, I'm constantly updating my database from NASA sources. Try asking about 'Black Holes' or 'Mars'."
    
    for key in SPACE_KNOWLEDGE:
        if key in msg:
            response_text = SPACE_KNOWLEDGE[key]
            break
            
    return ChatResponse(
        response=response_text,
        source_links=["https://www.nasa.gov"],
        images=["https://images-assets.nasa.gov/image/PIA23122/PIA23122~medium.jpg"]
    )

@app.get("/api/news")
async def get_space_news():
    return [
        {"id": 1, "title": "Artemis III Update", "content": "NASA prepares for lunar landing missions.", "date": "2026-03-16", "category": "Mission"},
        {"id": 2, "title": "JWST Discovers New Galaxy", "content": "The James Webb Space Telescope spotted a galaxy from the early universe.", "date": "2026-03-15", "category": "Research"},
        {"id": 3, "title": "SpaceX Starship Flight 4", "content": "Next flight test planned for upcoming month.", "date": "2026-03-14", "category": "Launch"}
    ]
