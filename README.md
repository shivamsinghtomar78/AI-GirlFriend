# Luna AI - Intelligent Companion

A premium AI companion application with advanced emotional intelligence and multiple conversation modes.

## Features

- **Multiple Conversation Modes**: Witty, Intimate, Fun, Professional, Friendly, Flirty, and Casual
- **Real-time Chat**: WebSocket-powered live communication
- **Advanced AI**: Powered by OpenRouter with multiple specialized models
- **Beautiful UI**: Modern design with Tailwind CSS and Framer Motion animations
- **Privacy Focused**: Local data storage with SQLite and FAISS
- **Responsive Design**: Works perfectly on desktop and mobile

## Tech Stack

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- Framer Motion for animations
- Zustand for state management
- React Router for navigation

### Backend
- FastAPI (Python 3.11+)
- SQLAlchemy + SQLite database
- OpenRouter API integration
- LangChain/LangGraph for AI agents
- FAISS for vector storage

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Redis (optional, for caching)

### Installation

1. **Clone and setup the project:**
```bash
cd "AI GF"
```

2. **Setup Frontend:**
```bash
cd frontend
npm install
```

3. **Setup Backend:**
```bash
cd ../backend
pip install -r requirements.txt
```

4. **Environment Configuration:**
```bash
# Copy environment template
cp .env.example .env

# Create frontend environment file
cd frontend
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
echo "VITE_WS_URL=ws://localhost:8000/ws" >> .env
echo "VITE_APP_NAME=Luna AI" >> .env
```

### Running the Application

1. **Start Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

2. **Start Frontend:**
```bash
cd frontend
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Project Structure

```
AI GF/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand state management
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # FastAPI Python application
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── core/           # Configuration
│   └── requirements.txt
├── data/                   # SQLite database and FAISS indices
└── README.md
```

## Configuration

### OpenRouter API
The application uses OpenRouter for AI model access. The API key is already configured in the settings, but you can update it in the backend configuration.

### Conversation Modes
Each mode uses a specialized AI model optimized for different conversation styles:
- **Witty**: Sharp humor and clever banter
- **Intimate**: Deep, personal conversations
- **Fun**: Playful and entertaining chats
- **Professional**: Focused and productive discussions
- **Friendly**: Warm and supportive companion
- **Flirty**: Charming and playful interactions
- **Casual**: Light and easy conversations

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
uvicorn app.main:app --reload    # Start with auto-reload
```

### Database Management
The SQLite database is automatically created when you first run the backend. Tables are created using SQLAlchemy models.
