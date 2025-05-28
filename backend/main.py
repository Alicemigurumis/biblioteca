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

# TMDB API endpoints
TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

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

def get_tmdb_image_url(path: Optional[str]) -> Optional[str]:
    if not path:
        return None
    if path.startswith('http'):
        return path
    return f"{TMDB_IMAGE_BASE_URL}{path}"

# API Routes
@app.get("/api/search/{media_type}")
async def search_media(media_type: str, query: str, page: int = 1):
    try:
        if media_type in ["movie", "tv"]:
            # Search TMDB
            response = requests.get(
                f"{TMDB_BASE_URL}/search/{media_type}",
                params={
                    "api_key": TMDB_API_KEY,
                    "query": query,
                    "page": page,
                    "include_adult": False,
                    "language": "en-US"
                }
            )
            
            if response.status_code != 200:
                print(f"TMDB API Error: {response.text}")  # Debug log
                raise HTTPException(status_code=response.status_code, detail="TMDB API error")
            
            data = response.json()
            
            # Transform TMDB response
            results = []
            for item in data.get("results", []):
                poster_path = item.get("poster_path")
                cover_image = get_tmdb_image_url(poster_path) if poster_path else None
                
                # Debug log
                print(f"Poster path: {poster_path}")
                print(f"Cover image URL: {cover_image}")
                
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
            # Search Google Books
            response = requests.get(
                "https://www.googleapis.com/books/v1/volumes",
                params={
                    "q": query,
                    "key": GOOGLE_BOOKS_API_KEY,
                    "startIndex": (page - 1) * 10,
                    "maxResults": 10
                }
            )
            data = response.json()
            
            # Transform Google Books response
            results = []
            for item in data.get("items", []):
                volume_info = item.get("volumeInfo", {})
                result = {
                    "id": item["id"],
                    "type": "book",
                    "title": volume_info.get("title", ""),
                    "year": volume_info.get("publishedDate", "")[:4] if volume_info.get("publishedDate") else "",
                    "cover_image": volume_info.get("imageLinks", {}).get("thumbnail"),
                    "description": volume_info.get("description"),
                    "creator": ", ".join(volume_info.get("authors", [])),
                    "rating": volume_info.get("averageRating", 0)
                }
                results.append(result)
            
            total_items = data.get("totalItems", 0)
            total_pages = (total_items + 9) // 10
            
            return {"results": results, "total_pages": total_pages}
            
        else:
            raise HTTPException(status_code=400, detail="Invalid media type")
            
    except Exception as e:
        print(f"Error in search_media: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/media/{media_type}/{id}")
async def get_media_details(media_type: str, id: str):
    try:
        if media_type in ["movie", "tv"]:
            # Get TMDB details
            response = requests.get(
                f"{TMDB_BASE_URL}/{media_type}/{id}",
                params={
                    "api_key": TMDB_API_KEY,
                    "language": "en-US"
                }
            )
            
            if response.status_code != 200:
                print(f"TMDB API Error: {response.text}")  # Debug log
                raise HTTPException(status_code=response.status_code, detail="TMDB API error")
            
            item = response.json()
            
            # Get credits for cast information
            credits = requests.get(
                f"{TMDB_BASE_URL}/{media_type}/{id}/credits",
                params={"api_key": TMDB_API_KEY}
            ).json()
            
            poster_path = item.get("poster_path")
            cover_image = get_tmdb_image_url(poster_path) if poster_path else None
            
            # Debug log
            print(f"Poster path: {poster_path}")
            print(f"Cover image URL: {cover_image}")
            
            result = {
                "id": str(item["id"]),
                "type": media_type,
                "title": item.get("title") or item.get("name"),
                "year": (item.get("release_date") or item.get("first_air_date", ""))[:4],
                "cover_image": cover_image,
                "description": item.get("overview"),
                "rating": item.get("vote_average", 0) / 2,  # Convert to 5-star scale
                "creator": ", ".join(d["name"] for d in item.get("created_by", []) or item.get("directors", [])),
                "additional_info": {
                    "runtime": item.get("runtime") or sum(e.get("runtime", 0) for e in item.get("episodes", [])),
                    "cast": [c["name"] for c in credits.get("cast", [])[:5]]
                }
            }
            
            return result
            
        elif media_type == "book":
            # Get Google Books details
            response = requests.get(
                f"https://www.googleapis.com/books/v1/volumes/{id}",
                params={"key": GOOGLE_BOOKS_API_KEY}
            )
            item = response.json()
            volume_info = item.get("volumeInfo", {})
            
            result = {
                "id": item["id"],
                "type": "book",
                "title": volume_info.get("title", ""),
                "year": volume_info.get("publishedDate", "")[:4] if volume_info.get("publishedDate") else "",
                "cover_image": volume_info.get("imageLinks", {}).get("thumbnail"),
                "description": volume_info.get("description"),
                "creator": ", ".join(volume_info.get("authors", [])),
                "rating": volume_info.get("averageRating", 0),
                "additional_info": {
                    "pages": volume_info.get("pageCount"),
                    "publisher": volume_info.get("publisher")
                }
            }
            
            return result
            
        else:
            raise HTTPException(status_code=400, detail="Invalid media type")
            
    except Exception as e:
        print(f"Error in get_media_details: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)