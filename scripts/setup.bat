@echo off
echo Setting up Luna AI Development Environment...

echo.
echo Creating data directory...
if not exist "data" mkdir data

echo.
echo Setting up Frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend setup failed!
    pause
    exit /b 1
)

echo.
echo Setting up Backend...
cd ..\backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Backend setup failed!
    pause
    exit /b 1
)

echo.
echo Creating environment files...
cd ..
if not exist ".env" (
    copy ".env.example" ".env"
    echo Created .env file
)

cd frontend
if not exist ".env" (
    echo VITE_API_BASE_URL=http://localhost:8000 > .env
    echo VITE_WS_URL=ws://localhost:8000/ws >> .env
    echo VITE_APP_NAME=Luna AI >> .env
    echo Created frontend .env file
)

cd ..
echo.
echo Setup complete! 
echo.
echo To start the application:
echo 1. Backend: cd backend && uvicorn app.main:app --reload --port 8000
echo 2. Frontend: cd frontend && npm run dev
echo.
pause