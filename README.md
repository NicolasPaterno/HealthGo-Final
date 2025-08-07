# HealthGo - Projeto Full Stack

Este é um projeto full stack que combina um frontend React com Vite e um backend .NET 7.0.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **.NET 7.0 SDK**
- **MySQL** (para o banco de dados)
- **Cursor IDE** ou **VS Code**

### Fluxo de Configuração

1. **Clone o repositório**
2. **Instale as dependências:** `npm run setup`
3. **Configure as variáveis de ambiente:** `npm run setup:env`
4. **Configure o banco de dados:** `npm run setup:db`
5. **Execute o projeto:** `npm run dev`

### Instalação das Dependências

#### **Opção 1: Script Automatizado (Recomendado)**
```bash
npm run setup
```

#### **Opção 2: Script PowerShell**
```bash
.\install-dependencies.ps1
```

#### **Opção 3: Manual**
```bash
# Instalar dependências do projeto principal
npm install

# Instalar dependências do frontend
cd APPS/web && npm install

# Restaurar pacotes do backend
cd APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo && dotnet restore
```

### Executando o Projeto

#### Opção 1: Executar Frontend e Backend Separadamente

**Backend (.NET):**
```bash
cd APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo
dotnet run
```
O backend estará disponível em: `https://localhost:7000` ou `http://localhost:5000`

**Frontend (React/Vite):**
```bash
cd APPS/web
npm run dev
```
O frontend estará disponível em: `http://localhost:5173`

#### Opção 2: Executar Ambos Simultaneamente (Recomendado)

```bash
npm run dev
```

Este comando executará tanto o frontend quanto o backend em paralelo usando `concurrently`.

#### Opção 3: Usando o Cursor/VS Code

1. **Pressione `Ctrl+Shift+P`** (ou `Cmd+Shift+P` no Mac)
2. **Digite "Tasks: Run Task"**
3. **Selecione "start-fullstack"**

Ou use o debugger integrado:
1. **Pressione `F5`**
2. **Selecione "Launch Full Stack"**

### Scripts Disponíveis

#### **Desenvolvimento:**
- `npm run dev` - Executa frontend e backend simultaneamente
- `npm run start` - Alias para npm run dev
- `npm run dev:frontend` - Executa apenas o frontend
- `npm run dev:backend` - Executa apenas o backend

#### **Instalação e Configuração:**
- `npm run setup` - Instala todas as dependências
- `npm run setup:db` - Configura o banco de dados

#### **Build:**
- `npm run build:all` - Compila frontend e backend
- `npm run build:frontend` - Compila apenas o frontend
- `npm run build:backend` - Compila apenas o backend

#### **Limpeza:**
- `npm run clean:backend` - Limpa build do .NET

### 🔐 Configuração Segura

#### **1. Configurar Variáveis de Ambiente (Obrigatório)**
```bash
npm run setup:env
```

Este script irá:
- Criar um arquivo `appsettings.Local.json` com suas credenciais
- Proteger dados sensíveis (senhas, emails) do GitHub
- Configurar automaticamente a conexão com o banco

#### **2. Configurar Banco de Dados**
```bash
npm run setup:db
```

**Nota:** Os dados sensíveis ficam no arquivo `appsettings.Local.json` que **NÃO** é enviado para o GitHub.

### Estrutura do Projeto

```
Healthgo/
├── 📄 .gitignore                 # Git ignore centralizado
├── 📄 .cursorrules               # Regras do Cursor IDE
├── 📄 package.json              # Scripts e dependências principais
├── 📄 README.md                 # Documentação principal
├── 📄 PROJECT_STRUCTURE.md      # Documentação da estrutura
├── 📄 install-dependencies.ps1  # Script de instalação
├── 📄 setup-database.ps1        # Script de configuração do banco
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

**📋 Para mais detalhes sobre a estrutura, consulte:** `PROJECT_STRUCTURE.md`

### Portas Utilizadas

- **Frontend:** 5173 (http://localhost:5173)
- **Backend:** 5204/7243 (http://localhost:5204 / https://localhost:7243)
- **Swagger/API Docs:** https://localhost:7243/swagger (abre automaticamente)

### Troubleshooting

**Problema:** Erro de dependências não encontradas
```bash
npm run install:all
```

**Problema:** Erro de compilação .NET (só execute se necessário):
```bash
npm run clean:backend
npm run install:backend
```

**Nota:** O `dotnet run` compila automaticamente quando necessário, então não é preciso fazer build manualmente na maioria dos casos.

**Problema:** Porta já em uso
- Verifique se não há outros processos rodando nas portas 5000, 7000 ou 5173
- Use `netstat -ano | findstr :5000` (Windows) para verificar portas em uso

### Desenvolvimento

- O frontend usa **hot reload** - mudanças são refletidas automaticamente
- O backend usa **watch mode** - reinicia automaticamente quando há mudanças
- Use `Ctrl+C` para parar os servidores

### Contribuição

1. Faça suas alterações
2. Teste localmente usando `npm run dev`
3. Commit suas mudanças
4. Push para o repositório
