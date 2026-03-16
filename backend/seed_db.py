import sys
import os
from datetime import date
from sqlalchemy.orm import Session

# Add the parent directory to sys.path to allow importing from models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.database import SessionLocal, init_db
from models.space_models import Planet, SpaceMission, Star

def seed_data():
    init_db()
    db: Session = SessionLocal()
    
    # Planets
    planets = [
        Planet(name="Mars", mass="6.39 x 10^23 kg", radius=3389.5, gravity=3.71, orbital_period=687.0, description="The Red Planet, home to Olympus Mons and Valles Marineris."),
        Planet(name="Jupiter", mass="1.898 x 10^27 kg", radius=69911.0, gravity=24.79, orbital_period=4333.0, description="The largest planet in our solar system, a gas giant with a Great Red Spot.")
    ]
    
    # Missions
    missions = [
        SpaceMission(mission_name="Artemis I", agency="NASA", launch_date=date(2022, 11, 16), mission_goal="Uncrewed Moon-orbiting mission to test the SLS rocket and Orion spacecraft."),
        SpaceMission(mission_name="Mars 2020", agency="NASA", launch_date=date(2020, 7, 30), mission_goal="Landing the Perseverance rover on Mars to search for signs of ancient life.")
    ]
    
    # Stars
    stars = [
        Star(name="Sun", type="G-type Main-Sequence", distance_from_earth="0 light years", luminosity="3.828 x 10^26 W"),
        Star(name="Proxima Centauri", type="Red Dwarf", distance_from_earth="4.24 light years", luminosity="0.0017 Suns")
    ]
    
    for p in planets:
        if not db.query(Planet).filter(Planet.name == p.name).first():
            db.add(p)
    
    for m in missions:
        if not db.query(SpaceMission).filter(SpaceMission.mission_name == m.mission_name).first():
            db.add(m)

    for s in stars:
        if not db.query(Star).filter(Star.name == s.name).first():
            db.add(s)
            
    db.commit()
    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
