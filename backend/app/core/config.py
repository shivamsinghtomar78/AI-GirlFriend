from pydantic_settings import BaseSettings
from typing import Dict

class Settings(BaseSettings):
    # API Configuration
    app_name: str = "AI Girlfriend Backend"
    debug: bool = True
    
    # OpenRouter Configuration
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_http_referer: str = "http://localhost:3000"
    openrouter_app_name: str = "AI Girlfriend (Development)"
    
    # Google Gemini Configuration
    google_api_key: str = ""
    
    # Database Configuration
    database_url: str = "sqlite:///./data/luna_ai.db"
    
    # Redis Configuration
    redis_url: str = "redis://localhost:6379"
    
    # Security
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Model Assignment - Using only Google Gemini models
    model_assignment: Dict[str, list] = {
        "witty_mode": ["gemini-2.0-flash", "gemini-1.5-flash"],
        "intimate_mode": ["gemini-2.0-flash", "gemini-1.5-flash"],
        "fun_mode": ["gemini-2.0-flash", "gemini-1.5-flash"],
        "lightweight_mode": ["gemini-2.0-flash", "gemini-1.5-flash"],
        "professional_mode": ["gemini-2.0-flash", "gemini-1.5-flash"],
        "friendly_mode": ["gemini-2.0-flash", "gemini-1.5-flash"],
        "flirty_mode": ["gemini-2.0-flash", "gemini-1.5-flash"]
    }
    
    class Config:
        env_file = ".env"

settings = Settings()