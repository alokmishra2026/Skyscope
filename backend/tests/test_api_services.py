import sys
import os

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services import nasa_service as nasa
from app.services import isro_service as isro

def test_services():
    print("--- Testing NASA APOD ---")
    apod = nasa.get_apod()
    if apod:
        print(f"Success: {apod.get('title')}")
    else:
        print("Failed to fetch APOD")

    print("\n--- Testing NASA Mars Rover ---")
    photos = nasa.get_mars_rover_photos()
    if photos:
        print(f"Success: Found {len(photos)} photos")
    else:
        print("Failed to fetch Mars photos")

    print("\n--- Testing ISRO Missions ---")
    missions = isro.get_isro_missions()
    if missions:
        print(f"Success: Found {len(missions)} missions")
    else:
        print("Failed to fetch ISRO missions")

if __name__ == "__main__":
    test_services()
