from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict

class ChatRequest(BaseModel):
    message: str
    mode: str = "friendly_mode"
    conversation_id: Optional[str] = None
    user_name: Optional[str] = None
    girlfriend_name: Optional[str] = None
    conversation_context: Optional[str] = None
    personality_traits: Optional[Dict[str, int]] = None
    language: Optional[str] = "english"

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    mode: str
    timestamp: datetime

class ConversationCreate(BaseModel):
    mode: str = "friendly_mode"
    title: Optional[str] = None

class ConversationResponse(BaseModel):
    id: str
    mode: str
    title: Optional[str]
    created_at: datetime
    message_count: int

class MessageResponse(BaseModel):
    id: str
    content: str
    sender: str
    mode: Optional[str]
    created_at: datetime