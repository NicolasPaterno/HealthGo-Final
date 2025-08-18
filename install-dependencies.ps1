# Script para instalar todas as dependências do projeto HealthGo
# Execute este script no PowerShell como administrador se necessário

Write-Host "📦 Instalando dependências do projeto HealthGo..." -ForegroundColor Green

# Verificar se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro." -ForegroundColor Red
    Write-Host "💡 Você pode baixar o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar se o .NET está instalado
try {
    $dotnetVersion = dotnet --version
    Write-Host "✅ .NET encontrado: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET não encontrado. Por favor, instale o .NET 7.0 SDK primeiro." -ForegroundColor Red
    Write-Host "💡 Você pode baixar o .NET em: https://dotnet.microsoft.com/download" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🔧 Instalando dependências do projeto principal..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do projeto principal" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🌐 Instalando dependências do frontend..." -ForegroundColor Yellow
Set-Location "APPS/web"
npm install
Set-Location "../.."

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Restaurando pacotes do backend..." -ForegroundColor Yellow
Set-Location "APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo"
dotnet restore
Set-Location "../../../../.."

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao restaurar pacotes do backend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Todas as dependências foram instaladas com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure o banco de dados: .\setup-database.ps1" -ForegroundColor White
Write-Host "2. Execute o projeto: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🚀 O projeto estará disponível em:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend: https://localhost:7243" -ForegroundColor White
Write-Host "   Swagger: https://localhost:7243/swagger" -ForegroundColor White 