from fastapi import APIRouter
from .logic import get_ai_response

router = APIRouter(prefix="/chatbot", tags=["chatbot"])

@router.post("/chat")
async def chat(request: dict):
    message = request.get("message", "")
    return get_ai_response(message)

@router.get("/status")
async def status():
    return {"status": "AI Space Mentor is online and ready to assist."}
