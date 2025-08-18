# Estrutura do Projeto HealthGo

## 📁 Organização Geral

```
Healthgo/
├── 📄 .gitignore                 # Git ignore centralizado
├── 📄 .cursorrules               # Regras do Cursor IDE
├── 📄 package.json              # Scripts e dependências principais
├── 📄 README.md                 # Documentação principal
├── 📄 PROJECT_STRUCTURE.md      # Este arquivo
├── 📄 install-dependencies.ps1  # Script de instalação
├── 📄 setup-database.ps1        # Script de configuração do banco
├── 📄 setup-environment.ps1     # Script de configuração de ambiente
├── 📄 start-project.ps1         # Script de inicialização
├── 📁 .vscode/                  # Configurações do VS Code/Cursor
│   ├── 📄 launch.json           # Configuração de debug
│   ├── 📄 tasks.json            # Tarefas automatizadas
│   └── 📄 settings.json         # Configurações do editor
└── 📁 APPS/                     # Aplicações do projeto
    ├── 📁 web/                  # Frontend React + Vite
    ├── 📁 api/                  # Backend .NET 7.0
    └── 📁 database/             # Scripts SQL
```

## 🚀 Scripts Disponíveis

### **Instalação e Configuração:**
```bash
npm run setup        # Instala todas as dependências
npm run setup:env    # Configura variáveis de ambiente
npm run setup:db     # Configura o banco de dados
```

### **Desenvolvimento:**
```bash
npm run dev          # Executa frontend e backend
npm run start        # Alias para npm run dev
npm run dev:frontend # Apenas frontend
npm run dev:backend  # Apenas backend
```

### **Build:**
```bash
npm run build:all    # Compila ambos os projetos
npm run build:frontend
npm run build:backend
```

### **Limpeza:**
```bash
npm run clean:backend # Limpa build do .NET
```

## 📋 Scripts PowerShell

### **install-dependencies.ps1**
- Instala dependências do Node.js
- Restaura pacotes do .NET
- Verifica pré-requisitos

### **setup-environment.ps1**
- Configura variáveis de ambiente
- Cria arquivo de configuração local
- Protege dados sensíveis

### **setup-database.ps1**
- Configura o banco MySQL
- Executa scripts SQL
- Cria tabelas e dados iniciais

### **start-project.ps1**
- Interface interativa para executar o projeto
- Opções de execução separada ou simultânea

## 🔧 Configurações

### **Portas Utilizadas:**
- **Frontend:** http://localhost:5173
- **Backend:** https://localhost:7243
- **Swagger:** https://localhost:7243/swagger

### **Banco de Dados:**
- **Nome:** HealthGo
- **String de conexão:** Server=localhost;Database=HealthGo;Uid=root;Pwd=Coxinha99109910.;

## 📦 Dependências

### **Projeto Principal (Raiz):**
- `concurrently` - Execução simultânea de comandos

### **Frontend (APPS/web/):**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router DOM

### **Backend (APPS/api/):**
- .NET 7.0
- Entity Framework
- MySQL.Data
- Dapper
- JWT Authentication

## 🎯 Fluxo de Desenvolvimento

1. **Clone o repositório**
2. **Execute:** `npm run setup`
3. **Configure ambiente:** `npm run setup:env`
4. **Configure o banco:** `npm run setup:db`
5. **Inicie o desenvolvimento:** `npm run dev`

## 🔍 Troubleshooting

### **Problemas de Dependências:**
```bash
npm run setup
```

### **Problemas de Banco:**
```bash
npm run setup:db
```

### **Problemas de Build:**
```bash
npm run clean:backend
npm run install:backend
```

## 📝 Notas Importantes

- O `.gitignore` está centralizado na raiz
- Scripts PowerShell facilitam a configuração
- Configurações do VS Code/Cursor otimizadas
- Hot reload configurado para frontend e backend
- Swagger abre automaticamente 