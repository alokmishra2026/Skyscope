import requests

ISRO_API_BASE = "https://isro.vercel.app/api"

def get_isro_missions():
    """Fetch latest ISRO missions"""
    url = f"{ISRO_API_BASE}/customer_satellites"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json().get("customer_satellites", [])
    except Exception as e:
        print(f"ISRO Missions Error: {e}")
    return []

def get_isro_centres():
    """Fetch ISRO centers information"""
    url = f"{ISRO_API_BASE}/centres"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json().get("centres", [])
    except Exception as e:
        print(f"ISRO Centres Error: {e}")
    return []

def get_isro_launchers():
    """Fetch ISRO launcher details"""
    url = f"{ISRO_API_BASE}/launchers"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json().get("launchers", [])
    except Exception as e:
        print(f"ISRO Launchers Error: {e}")
    return []
