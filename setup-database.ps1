# Script para configurar o banco de dados HealthGo
# Execute este script no PowerShell como administrador se necessário

Write-Host "🗄️ Configurando banco de dados HealthGo..." -ForegroundColor Green

# Verificar se o MySQL está instalado
try {
    $mysqlVersion = mysql --version
    Write-Host "✅ MySQL encontrado: $mysqlVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ MySQL não encontrado. Por favor, instale o MySQL primeiro." -ForegroundColor Red
    Write-Host "💡 Você pode baixar o MySQL em: https://dev.mysql.com/downloads/mysql/" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Executando scripts SQL..." -ForegroundColor Yellow

# Executar script de criação do banco
Write-Host "🔨 Criando tabelas..." -ForegroundColor Cyan
mysql -u root -p < "APPS/database/database_creation.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Tabelas criadas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao criar tabelas. Verifique se o MySQL está rodando." -ForegroundColor Red
    exit 1
}

# Executar script de inserção de dados
Write-Host "📊 Inserindo dados iniciais..." -ForegroundColor Cyan
mysql -u root -p < "APPS/database/database_insertions.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dados inseridos com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao inserir dados." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Banco de dados configurado com sucesso!" -ForegroundColor Green
Write-Host "📖 Banco: HealthGo" -ForegroundColor Cyan
Write-Host "🔗 String de conexão: Server=localhost;Database=HealthGo;Uid=root;Pwd=;" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Agora você pode executar: npm run dev" -ForegroundColor Yellow 