@echo off
echo Starting Luna AI Development Environment...

echo.
echo Starting Backend Server...
start "Luna AI Backend" cmd /k "cd backend && uvicorn app.main:app --reload --port 8000"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Luna AI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause > nul