from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import requests
from typing import Optional
from pydantic import BaseModel
import sqlite3
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Keys
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
GOOGLE_BOOKS_API_KEY = os.getenv("GOOGLE_BOOKS_API_KEY")

# API Configuration
TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"
TMDB_POSTER_SIZE = "w500"
TMDB_THUMBNAIL_SIZE = "w185"

GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes"

# Database setup
def init_db():
    conn = sqlite3.connect('media_library.db')
    c = conn.cursor()
    
    # Create tables
    c.execute('''
        CREATE TABLE IF NOT EXISTS media (
            id TEXT PRIMARY KEY,
            type TEXT NOT NULL,
            title TEXT NOT NULL,
            year TEXT,
            cover_image TEXT,
            rating REAL,
            description TEXT,
            creator TEXT,
            date_added TEXT,
            review_text TEXT,
            additional_info TEXT
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS tags (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL UNIQUE
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS media_tags (
            media_id TEXT,
            tag_id TEXT,
            FOREIGN KEY (media_id) REFERENCES media (id),
            FOREIGN KEY (tag_id) REFERENCES tags (id),
            PRIMARY KEY (media_id, tag_id)
        )
    ''')
    
    conn.commit()
    conn.close()

init_db()

# Models
class SearchQuery(BaseModel):
    query: str
    type: str
    page: Optional[int] = 1

class MediaItem(BaseModel):
    id: str
    type: str
    title: str
    year: Optional[str]
    cover_image: Optional[str]
    rating: Optional[float]
    description: Optional[str]
    creator: Optional[str]
    tags: list[str] = []

# Helper Functions
def _make_tmdb_request(endpoint: str, params: dict = None) -> dict:
    """Makes a request to the TMDb API with proper error handling."""
    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="TMDB API key not configured")
    
    if params is None:
        params = {}
    
    params.update({
        "api_key": TMDB_API_KEY,
        "language": "pt-BR",
        "include_adult": False
    })
    
    url = f"{TMDB_BASE_URL}/{endpoint}"
    print(f"[DEBUG] TMDb Request URL: {url}")
    print(f"[DEBUG] TMDb Request PARAMS: {params}")
    
    try:
        response = requests.get(url, params=params, timeout=10)
        print(f"[DEBUG] TMDb Response Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"[DEBUG] TMDb Error Response: {response.text}")
            raise HTTPException(status_code=response.status_code, detail="TMDB API error")
        
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error making TMDb request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def _get_tmdb_image_url(path: Optional[str], size: str = TMDB_POSTER_SIZE) -> Optional[str]:
    """Constructs the full URL for a TMDb image."""
    if not path:
        return None
    if path.startswith('http'):
        return path
    return f"{TMDB_IMAGE_BASE_URL}/{size}{path}"

def _get_google_books_cover_url(volume_info: dict) -> Optional[str]:
    """Extracts the best available cover URL from Google Books volume info."""
    if not volume_info or "imageLinks" not in volume_info:
        return None
    
    links = volume_info["imageLinks"]
    # Try to get the largest available image
    for size in ["extraLarge", "large", "medium", "small", "thumbnail"]:
        if size in links:
            url = links[size]
            # Ensure HTTPS
            if url.startswith("http://"):
                url = "https://" + url[7:]
            return url
    return None

# API Routes
@app.get("/api/search/{media_type}")
async def search_media(media_type: str, query: str, page: int = 1):
    try:
        if media_type in ["movie", "tv"]:
            endpoint = f"search/{media_type}"
            data = _make_tmdb_request(endpoint, {
                "query": query,
                "page": page
            })
            
            results = []
            for item in data.get("results", []):
                cover_image = _get_tmdb_image_url(item.get("poster_path"), TMDB_THUMBNAIL_SIZE)
                
                print(f"[DEBUG] Poster path: {item.get('poster_path')}")
                print(f"[DEBUG] Cover image URL: {cover_image}")
                
                result = {
                    "id": str(item["id"]),
                    "type": media_type,
                    "title": item.get("title") or item.get("name"),
                    "year": (item.get("release_date") or item.get("first_air_date", ""))[:4],
                    "cover_image": cover_image,
                    "description": item.get("overview"),
                    "rating": item.get("vote_average", 0) / 2  # Convert to 5-star scale
                }
                results.append(result)
            
            return {"results": results, "total_pages": data.get("total_pages", 1)}
            
        elif media_type == "book":
            try:
                response = requests.get(
                    GOOGLE_BOOKS_API_URL,
                    params={
                        "q": query,
                        "key": GOOGLE_BOOKS_API_KEY,
                        "startIndex": (page - 1) * 10,
                        "maxResults": 10,
                        "langRestrict": "pt",
                        "printType": "books"
                    },
                    timeout=10
                )
                response.raise_for_status()
                data = response.json()
                
                results = []
                for item in data.get("items", []):
                    volume_info = item.get("volumeInfo", {})
                    cover_image = _get_google_books_cover_url(volume_info)
                    
                    print(f"[DEBUG] Book cover URL: {cover_image}")
                    
                    result = {
                        "id": item["id"],
                        "type": "book",
                        "title": volume_info.get("title", ""),
                        "year": volume_info.get("publishedDate", "")[:4] if volume_info.get("publishedDate") else "",
                        "cover_image": cover_image,
                        "description": volume_info.get("description"),
                        "creator": ", ".join(volume_info.get("authors", [])),
                        "rating": volume_info.get("averageRating", 0)
                    }
                    results.append(result)
                
                total_items = data.get("totalItems", 0)
                total_pages = (total_items + 9) // 10
                
                return {"results": results, "total_pages": total_pages}
                
            except requests.exceptions.RequestException as e:
                print(f"[DEBUG] Google Books API error: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Google Books API error: {str(e)}")
            
        else:
            raise HTTPException(status_code=400, detail="Invalid media type")
            
    except Exception as e:
        print(f"[DEBUG] Error in search_media: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/media/{media_type}/{id}")
async def get_media_details(media_type: str, id: str):
    try:
        if media_type in ["movie", "tv"]:
            # Get main details
            item = _make_tmdb_request(f"{media_type}/{id}")
            
            # Get credits
            credits = _make_tmdb_request(f"{media_type}/{id}/credits")
            
            cover_image = _get_tmdb_image_url(item.get("poster_path"))
            
            print(f"[DEBUG] Poster path: {item.get('poster_path')}")
            print(f"[DEBUG] Cover image URL: {cover_image}")
            
            # Get creator (director for movies, created by for TV shows)
            creator = None
            if media_type == "movie" and "crew" in credits:
                directors = [c["name"] for c in credits["crew"] if c["job"] == "Director"]
                creator = ", ".join(directors) if directors else None
            elif media_type == "tv":
                creators = [c["name"] for c in item.get("created_by", [])]
                creator = ", ".join(creators) if creators else None
            
            result = {
                "id": str(item["id"]),
                "type": media_type,
                "title": item.get("title") or item.get("name"),
                "year": (item.get("release_date") or item.get("first_air_date", ""))[:4],
                "cover_image": cover_image,
                "description": item.get("overview"),
                "rating": item.get("vote_average", 0) / 2,  # Convert to 5-star scale
                "creator": creator,
                "additional_info": {
                    "runtime": item.get("runtime") or sum(e.get("runtime", 0) for e in item.get("episodes", [])),
                    "cast": [c["name"] for c in credits.get("cast", [])[:5]]
                }
            }
            
            return result
            
        elif media_type == "book":
            try:
                response = requests.get(
                    f"{GOOGLE_BOOKS_API_URL}/{id}",
                    params={"key": GOOGLE_BOOKS_API_KEY},
                    timeout=10
                )
                response.raise_for_status()
                item = response.json()
                
                volume_info = item.get("volumeInfo", {})
                cover_image = _get_google_books_cover_url(volume_info)
                
                print(f"[DEBUG] Book cover URL: {cover_image}")
                
                result = {
                    "id": item["id"],
                    "type": "book",
                    "title": volume_info.get("title", ""),
                    "year": volume_info.get("publishedDate", "")[:4] if volume_info.get("publishedDate") else "",
                    "cover_image": cover_image,
                    "description": volume_info.get("description"),
                    "creator": ", ".join(volume_info.get("authors", [])),
                    "rating": volume_info.get("averageRating", 0),
                    "additional_info": {
                        "pages": volume_info.get("pageCount"),
                        "publisher": volume_info.get("publisher")
                    }
                }
                
                return result
                
            except requests.exceptions.RequestException as e:
                print(f"[DEBUG] Google Books API error: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Google Books API error: {str(e)}")
            
        else:
            raise HTTPException(status_code=400, detail="Invalid media type")
            
    except Exception as e:
        print(f"[DEBUG] Error in get_media_details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)