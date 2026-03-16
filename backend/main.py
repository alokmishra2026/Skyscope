from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.chatbot.router import router as chatbot_router
from app.space_database.router import router as space_db_router
from app.satellite_tracker.router import router as satellite_router
from app.courses.router import router as courses_router
from app.quiz.router import router as quiz_router
from app.research_updater.router import router as research_router
from models.database import init_db
from app.utils.scheduler import start_scheduler

app = FastAPI(title="Vyomveda Skyscope - Ultimate Space Platform")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database
@app.on_event("startup")
def startup_event():
    init_db()
    start_scheduler()

# Include Routers
app.include_router(chatbot_router, prefix="/api")
app.include_router(space_db_router, prefix="/api")
app.include_router(satellite_router, prefix="/api")
app.include_router(courses_router, prefix="/api")
app.include_router(quiz_router, prefix="/api")
app.include_router(research_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Welcome to Vyomveda Skyscope API",
        "version": "1.0.0",
        "status": "Running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
