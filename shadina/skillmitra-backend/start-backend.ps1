# SkillMitra Backend Starter Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting SkillMitra Backend Server" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Navigate to backend directory
Set-Location "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"

Write-Host "Database Configuration:" -ForegroundColor Yellow
Write-Host "   Type: H2 File-based (Persistent)" -ForegroundColor White
Write-Host "   Location: ./data/skillmitra.mv.db" -ForegroundColor White
Write-Host "   Data persists between restarts" -ForegroundColor Green

Write-Host "Starting Maven Spring Boot..." -ForegroundColor Cyan

# Start the backend
mvn spring-boot:run
