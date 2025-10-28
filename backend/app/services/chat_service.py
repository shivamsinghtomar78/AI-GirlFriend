from sqlalchemy.orm import Session
from ..models import Conversation, Message
from ..schemas.chat import ChatRequest, ChatResponse
from .openrouter_service import openrouter_service
from datetime import datetime
import uuid

class ChatService:
    def __init__(self, db: Session):
        self.db = db
    
    async def process_message(self, chat_request: ChatRequest) -> ChatResponse:
        """Process incoming chat message and generate AI response."""
        
        # Get or create conversation
        conversation = await self._get_or_create_conversation(
            chat_request.conversation_id, 
            chat_request.mode
        )
        
        # Save user message
        user_message = Message(
            conversation_id=conversation.id,
            content=chat_request.message,
            sender="user",
            mode=chat_request.mode
        )
        self.db.add(user_message)
        self.db.commit()
        
        # Get conversation history for context
        history = self.db.query(Message).filter(
            Message.conversation_id == conversation.id
        ).order_by(Message.created_at.desc()).limit(10).all()
        
        # Generate AI response with context
        ai_response = await openrouter_service.generate_response(
            chat_request.message,
            chat_request.mode,
            list(reversed(history)),
            chat_request.user_name,
            chat_request.girlfriend_name,
            chat_request.conversation_context,
            chat_request.personality_traits,
            chat_request.language
        )
        
        # Save AI message
        ai_message = Message(
            conversation_id=conversation.id,
            content=ai_response,
            sender="ai",
            mode=chat_request.mode
        )
        self.db.add(ai_message)
        self.db.commit()
        
        return ChatResponse(
            response=ai_response,
            conversation_id=str(conversation.id),
            mode=chat_request.mode,
            timestamp=datetime.now()
        )
    
    async def _get_or_create_conversation(self, conversation_id: str = None, mode: str = "friendly_mode") -> Conversation:
        """Get existing conversation or create new one."""
        if conversation_id:
            conversation = self.db.query(Conversation).filter(
                Conversation.id == int(conversation_id)
            ).first()
            if conversation:
                return conversation
        
        # Create new conversation
        conversation = Conversation(
            mode=mode,
            title=f"Chat - {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        )
        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)
        
        return conversation
    
    def get_conversations(self) -> list:
        """Get all conversations with message counts."""
        conversations = self.db.query(Conversation).order_by(
            Conversation.updated_at.desc()
        ).all()
        
        result = []
        for conv in conversations:
            message_count = self.db.query(Message).filter(
                Message.conversation_id == conv.id
            ).count()
            
            result.append({
                "id": str(conv.id),
                "mode": conv.mode,
                "title": conv.title,
                "created_at": conv.created_at,
                "message_count": message_count
            })
        
        return result