import requests
import time

NASA_APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"

def fetch_daily_research():
    print("Fetching NASA Research...")
    try:
        response = requests.get(NASA_APOD_URL)
        if response.status_code == 200:
            data = response.json()
            print(f"Update: {data.get('title')}")
            return data
    except Exception as e:
        print(f"Error: {e}")
    return None

if __name__ == "__main__":
    fetch_daily_research()
