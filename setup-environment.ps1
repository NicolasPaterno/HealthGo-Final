# Script para configurar as variaveis de ambiente do projeto HealthGo
# Execute este script no PowerShell como administrador se necessario

Write-Host "Configurando variaveis de ambiente..." -ForegroundColor Green

# Verificar se o arquivo Local ja existe
$localConfigPath = "APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/appsettings.Local.json"

if (Test-Path $localConfigPath) {
    Write-Host "Arquivo de configuracao local ja existe" -ForegroundColor Green
} else {
    Write-Host "Criando arquivo de configuracao local..." -ForegroundColor Yellow
    
    # Solicitar dados do usuario
    Write-Host ""
    Write-Host "Configure as credenciais do banco de dados:" -ForegroundColor Cyan
    
    $dbPassword = Read-Host "Digite a senha do MySQL (deixe vazio se nao tiver senha)" -AsSecureString
    $dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword))
    
    $emailRemetente = Read-Host "Digite o email para envio (deixe vazio para usar padrao)"
    $emailSenha = Read-Host "Digite a senha do email (deixe vazio para usar padrao)" -AsSecureString
    $emailSenhaPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($emailSenha))
    
    # Criar conteudo do arquivo
    $emailRemetenteFinal = if ($emailRemetente) { $emailRemetente } else { "emailtestehealthgo@gmail.com" }
    $emailSenhaFinal = if ($emailSenhaPlain) { $emailSenhaPlain } else { "ylik dzpj cavt ebjh" }
    
    $configContent = @{
        ConnectionStrings = @{
            DefaultConnection = "Server=localhost;Database=HealthGo;Uid=root;Pwd=$dbPasswordPlain;"
        }
        Email = @{
            Remetente = $emailRemetenteFinal
            Senha = $emailSenhaFinal
        }
    }
    
    # Converter para JSON e salvar
    $configContent | ConvertTo-Json -Depth 3 | Out-File -FilePath $localConfigPath -Encoding UTF8
    
    Write-Host "Arquivo de configuracao local criado!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Configuracao concluida!" -ForegroundColor Green
Write-Host "Os dados sensiveis estao protegidos e nao serao enviados para o GitHub" -ForegroundColor Cyan
Write-Host ""
Write-Host "Agora voce pode executar: npm run dev" -ForegroundColor Yellow 