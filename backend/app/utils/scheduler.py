import asyncio
import datetime
from models.database import SessionLocal
from models.space_models import ResearchUpdate
from app.services import nasa_service as nasa
from app.services import isro_service as isro

async def sync_daily_data():
    """Fetches real-time space data and saves to ResearchUpdate model"""
    while True:
        print(f"[{datetime.datetime.now()}] Starting daily data sync...")
        db = SessionLocal()
        
        try:
            # 1. Fetch NASA APOD
            apod_data = nasa.get_apod()
            if apod_data:
                # Check if this update already exists for today
                existing = db.query(ResearchUpdate).filter(
                    ResearchUpdate.date == apod_data.get("date"),
                    ResearchUpdate.source == "NASA APOD"
                ).first()
                
                if not existing:
                    new_update = ResearchUpdate(
                        title=apod_data.get("title"),
                        description=apod_data.get("explanation"),
                        image_url=apod_data.get("url"),
                        source="NASA APOD",
                        date=apod_data.get("date")
                    )
                    db.add(new_update)
                    print(f"Added NASA APOD: {apod_data.get('title')}")

            # 2. Fetch ISRO Missions
            missions = isro.get_isro_missions()
            if missions:
                latest = missions[-1]
                today_str = datetime.date.today().isoformat()
                
                existing_isro = db.query(ResearchUpdate).filter(
                    ResearchUpdate.title == latest.get("name"),
                    ResearchUpdate.source == "ISRO"
                ).first()
                
                if not existing_isro:
                    new_isro = ResearchUpdate(
                        title=f"ISRO Mission: {latest.get('name')}",
                        description=f"Country: {latest.get('country')}. India's latest satellite mission details.",
                        image_url="https://www.isro.gov.in/media_isro/generic/logo.png",
                        source="ISRO",
                        date=today_str
                    )
                    db.add(new_isro)
                    print(f"Added ISRO Mission: {latest.get('name')}")

            db.commit()
        except Exception as e:
            print(f"Daily Sync Error: {e}")
            db.rollback()
        finally:
            db.close()
            
        # Wait for 24 hours (86400 seconds)
        # For testing, we might want a shorter interval or run once at startup
        await asyncio.sleep(86400)

def start_scheduler():
    """Starts the background sync task"""
    loop = asyncio.get_event_loop()
    loop.create_task(sync_daily_data())
