from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...core.database import get_db
from ...schemas.chat import ChatRequest, ChatResponse, ConversationCreate
from ...services.chat_service import ChatService

router = APIRouter()

@router.post("/message", response_model=ChatResponse)
async def send_message(
    chat_request: ChatRequest,
    db: Session = Depends(get_db)
):
    """Send a message and get AI response."""
    try:
        chat_service = ChatService(db)
        response = await chat_service.process_message(chat_request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/conversations")
async def get_conversations(db: Session = Depends(get_db)):
    """Get all conversations."""
    try:
        chat_service = ChatService(db)
        conversations = chat_service.get_conversations()
        return {"conversations": conversations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/conversations")
async def create_conversation(
    conversation_data: ConversationCreate,
    db: Session = Depends(get_db)
):
    """Create a new conversation."""
    try:
        chat_service = ChatService(db)
        conversation = await chat_service._get_or_create_conversation(
            mode=conversation_data.mode
        )
        return {
            "id": str(conversation.id),
            "mode": conversation.mode,
            "title": conversation.title,
            "created_at": conversation.created_at
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))