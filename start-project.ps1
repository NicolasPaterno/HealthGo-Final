# Script para iniciar o projeto HealthGo
# Execute este script no PowerShell como administrador se necessário

Write-Host "🚀 Iniciando o projeto HealthGo..." -ForegroundColor Green

# Verificar se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se o .NET está instalado
try {
    $dotnetVersion = dotnet --version
    Write-Host "✅ .NET encontrado: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET não encontrado. Por favor, instale o .NET 7.0 SDK primeiro." -ForegroundColor Red
    exit 1
}

# Instalar dependências se necessário
Write-Host "📦 Verificando dependências..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências do projeto..." -ForegroundColor Yellow
    npm install
}

# Verificar se as dependências do frontend estão instaladas
if (-not (Test-Path "APPS/web/node_modules")) {
    Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
    Set-Location "APPS/web"
    npm install
    Set-Location "../.."
}

# Restaurar pacotes do backend
Write-Host "🔧 Restaurando pacotes do backend..." -ForegroundColor Yellow
Set-Location "APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo"
dotnet restore
Set-Location "../../../../.."

Write-Host "✅ Todas as dependências estão prontas!" -ForegroundColor Green

# Perguntar ao usuário como quer executar
Write-Host ""
Write-Host "Escolha como executar o projeto:" -ForegroundColor Cyan
Write-Host "1. Executar frontend e backend simultaneamente (recomendado)" -ForegroundColor White
Write-Host "2. Executar apenas o frontend" -ForegroundColor White
Write-Host "3. Executar apenas o backend" -ForegroundColor White
Write-Host "4. Sair" -ForegroundColor White

$choice = Read-Host "Digite sua escolha (1-4)"

switch ($choice) {
    "1" {
        Write-Host "🚀 Iniciando frontend e backend simultaneamente..." -ForegroundColor Green
        Write-Host "📖 O Swagger será aberto automaticamente em: https://localhost:7243/swagger" -ForegroundColor Cyan
        Write-Host "🌐 O frontend estará disponível em: http://localhost:5173" -ForegroundColor Cyan
        npm run dev
    }
    "2" {
        Write-Host "🚀 Iniciando apenas o frontend..." -ForegroundColor Green
        npm run dev:frontend
    }
    "3" {
        Write-Host "🚀 Iniciando apenas o backend..." -ForegroundColor Green
        npm run dev:backend
    }
    "4" {
        Write-Host "👋 Saindo..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "❌ Opção inválida. Saindo..." -ForegroundColor Red
        exit 1
    }
} 