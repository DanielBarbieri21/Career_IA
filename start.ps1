#!/usr/bin/env pwsh
# Career AI — Script de inicialização rápida

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              🚀 CAREER AI — Startup Script                ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar se .env existe
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Arquivo .env não encontrado. Criando a partir do .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env criado! Configure as variáveis obrigatórias antes de continuar." -ForegroundColor Green
    Write-Host ""
    Write-Host "Variáveis mínimas necessárias:" -ForegroundColor White
    Write-Host "  OPENAI_API_KEY      — Chave da API OpenAI" -ForegroundColor Gray
    Write-Host "  GOOGLE_CLIENT_ID    — OAuth2 Google" -ForegroundColor Gray
    Write-Host "  GITHUB_CLIENT_ID    — OAuth2 GitHub" -ForegroundColor Gray
    Write-Host ""
    exit 0
}

# Verificar Docker
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não encontrado. Instale em: https://docs.docker.com/get-docker/" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Iniciando serviços..." -ForegroundColor Cyan

# Subir serviços MVP
docker-compose up -d postgres redis rabbitmq

Write-Host ""
Write-Host "⏳ Aguardando serviços ficarem saudáveis..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar saúde
$postgresHealth = docker inspect --format="{{.State.Health.Status}}" career-ai-postgres 2>$null
$redisHealth = docker inspect --format="{{.State.Health.Status}}" career-ai-redis 2>$null

Write-Host ""
Write-Host "Status dos serviços:" -ForegroundColor White
Write-Host "  PostgreSQL: $postgresHealth" -ForegroundColor $(if ($postgresHealth -eq "healthy") { "Green" } else { "Yellow" })
Write-Host "  Redis:      $redisHealth" -ForegroundColor $(if ($redisHealth -eq "healthy") { "Green" } else { "Yellow" })

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                   📚 URLs da Aplicação                    ║" -ForegroundColor Cyan
Write-Host "╠═══════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║  🌐 Frontend:  http://localhost:3000                      ║" -ForegroundColor White
Write-Host "║  🔧 Backend:   http://localhost:8080                      ║" -ForegroundColor White
Write-Host "║  📚 Swagger:   http://localhost:8080/swagger-ui.html      ║" -ForegroundColor White
Write-Host "║  📊 Grafana:   http://localhost:3001                      ║" -ForegroundColor White
Write-Host "║  🐰 RabbitMQ:  http://localhost:15672                     ║" -ForegroundColor White
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para iniciar o backend localmente:" -ForegroundColor Gray
Write-Host "  cd backend && ./mvnw spring-boot:run" -ForegroundColor Yellow
Write-Host ""
Write-Host "Para iniciar o frontend localmente:" -ForegroundColor Gray
Write-Host "  cd frontend && npm install && npm run dev" -ForegroundColor Yellow
Write-Host ""
