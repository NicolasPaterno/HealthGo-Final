# 🔐 Segurança e Proteção de Dados

## 📋 Visão Geral

Este projeto foi configurado para proteger dados sensíveis como senhas de banco de dados e credenciais de email, evitando que sejam enviados para o GitHub.

## 🛡️ Arquivos Protegidos

### **Arquivos que NÃO vão para o GitHub:**
- `appsettings.Local.json` - Configurações locais com dados sensíveis
- `appsettings.Development.json` - Configurações de desenvolvimento
- `*.pfx`, `*.p12`, `*.key`, `*.crt` - Certificados SSL
- `.env*` - Arquivos de variáveis de ambiente

### **Arquivos que VÃO para o GitHub:**
- `appsettings.json` - Configuração base (sem dados sensíveis)
- `appsettings.Example.json` - Exemplo de configuração

## 🔧 Configuração Segura

### **1. Configuração Automatizada (Recomendado)**
```bash
npm run setup:env
```

Este comando irá:
- Solicitar suas credenciais de forma segura
- Criar o arquivo `appsettings.Local.json`
- Proteger automaticamente os dados sensíveis

### **2. Configuração Manual**

Se preferir configurar manualmente:

1. **Copie o arquivo de exemplo:**
   ```bash
   cp APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/appsettings.Example.json APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/appsettings.Local.json
   ```

2. **Edite o arquivo `appsettings.Local.json`:**
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=HealthGo;Uid=root;Pwd=SUA_SENHA_REAL_AQUI;"
     },
     "Email": {
       "Remetente": "seu-email@gmail.com",
       "Senha": "sua-senha-de-app"
     }
   }
   ```

## 📁 Estrutura de Configuração

```
APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/
├── appsettings.json           # Configuração base (sem dados sensíveis)
├── appsettings.Example.json   # Exemplo de configuração
├── appsettings.Local.json     # Configuração local (NÃO vai para GitHub)
└── appsettings.Development.json # Configuração de desenvolvimento (NÃO vai para GitHub)
```

## 🔒 Como Funciona

1. **Configuração Base (`appsettings.json`):**
   - Contém configurações padrão
   - Não possui dados sensíveis
   - Vai para o GitHub

2. **Configuração Local (`appsettings.Local.json`):**
   - Contém dados sensíveis (senhas, emails)
   - Criado automaticamente pelo script
   - **NÃO vai para o GitHub** (está no .gitignore)

3. **Hierarquia de Configuração:**
   - O .NET carrega primeiro `appsettings.json`
   - Depois sobrescreve com `appsettings.Local.json`
   - Dados sensíveis têm prioridade

## 🚨 Boas Práticas

### **✅ Faça:**
- Use sempre `npm run setup:env` para configurar
- Mantenha o arquivo `appsettings.Local.json` seguro
- Use senhas fortes para o banco de dados
- Configure autenticação de dois fatores no email

### **❌ Não Faça:**
- Nunca commite dados sensíveis
- Não compartilhe o arquivo `appsettings.Local.json`
- Não use senhas fracas
- Não deixe credenciais em comentários de código

## 🔍 Troubleshooting

### **Problema: "Connection string not found"**
```bash
# Verifique se o arquivo Local existe
ls APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/appsettings.Local.json

# Se não existir, execute:
npm run setup:env
```

### **Problema: "Access denied" no banco**
```bash
# Verifique se a senha está correta no arquivo Local
# Execute novamente:
npm run setup:env
```

### **Problema: Email não funciona**
```bash
# Verifique as credenciais de email no arquivo Local
# Execute novamente:
npm run setup:env
```

## 📞 Suporte

Se tiver problemas com configuração de segurança:
1. Verifique se o arquivo `appsettings.Local.json` existe
2. Execute `npm run setup:env` novamente
3. Verifique se as credenciais estão corretas
4. Consulte a documentação do MySQL e Gmail para configuração de senhas de app 