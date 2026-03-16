import requests
import random

NASA_API_KEY = "DEMO_KEY"  # Default demo key

def get_apod():
    """Fetch Astronomy Picture of the Day"""
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"NASA APOD Error: {e}")
    return None

def search_nasa_library(query):
    """Search NASA's image/video library"""
    url = f"https://images-api.nasa.gov/search?q={query}&media_type=image"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            items = data.get("collection", {}).get("items", [])
            if items:
                # Return 3 random items from results
                return random.sample(items, min(len(items), 3))
    except Exception as e:
        print(f"NASA Library Search Error: {e}")
    return []

def get_mars_rover_photos(rover="curiosity"):
    """Fetch latest photos from Mars rovers"""
    url = f"https://api.nasa.gov/mars-photos/api/v1/rovers/{rover}/latest_photos?api_key={NASA_API_KEY}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json().get("latest_photos", [])[:5]
    except Exception as e:
        print(f"NASA Mars Rover Error: {e}")
    return []
