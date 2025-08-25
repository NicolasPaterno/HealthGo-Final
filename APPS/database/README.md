# Scripts de Banco de Dados - HealthGo

Este diretório contém scripts para criar e popular o banco de dados do projeto HealthGo.

## 📁 Arquivos Disponíveis

### 1. `create_and_populate_database.sql` ⭐ **PRINCIPAL**
- **Descrição**: Script completo que cria o banco de dados e insere todos os dados de teste
- **Funcionalidades**:
  - Cria o banco `HealthGo`
  - Cria todas as tabelas necessárias
  - Insere dados básicos (estados, cidades)
  - Cria usuários de teste (Admin e User)
  - Insere hotéis e quartos de teste em Blumenau
  - Insere dados de outras entidades (lembretes, especialidades, etc.)

### 2. `migrate_pessoa_cidade_nullable.sql` 🔄 **NOVO**
- **Descrição**: Script de migração para tornar o campo Cidade_Id opcional na tabela Pessoa
- **Uso**: Para atualizar bancos de dados existentes
- **Funcionalidades**:
  - Remove a constraint de foreign key existente
  - Modifica a coluna Cidade_Id para permitir NULL
  - Recria a foreign key com ON DELETE SET NULL
  - Verifica se as alterações foram aplicadas corretamente

### 3. `fix_pessoa_cidade_nullable.sql` 🔧 **NOVO**
- **Descrição**: Script simplificado para tornar o campo Cidade_Id opcional
- **Uso**: Versão mais simples da migração

### 4. `complete_test_data.sql`
- **Descrição**: Script para inserir apenas dados de teste (banco já deve existir)
- **Uso**: Quando o banco já foi criado e você quer apenas adicionar dados de teste

### 5. `setup_test_data.sql`
- **Descrição**: Script específico para configurar dados de teste de hotéis
- **Uso**: Para testar especificamente a funcionalidade de hotéis

### 6. `fix_hotel_table.sql`
- **Descrição**: Corrige problemas na estrutura da tabela Hotel
- **Uso**: Para corrigir erros de estrutura do banco

### 7. `generate_passwords.cs`
- **Descrição**: Script C# para gerar senhas criptografadas com BCrypt
- **Uso**: Para gerar senhas seguras para os usuários

## 🚀 Como Usar

### Opção 1: Criação Completa (Recomendado)
```sql
-- Execute no MySQL Workbench ou linha de comando
source APPS/database/create_and_populate_database.sql;
```

### Opção 2: Linha de Comando
```bash
mysql -u root -p < APPS/database/create_and_populate_database.sql
```

### Opção 3: MySQL Workbench
1. Abra o MySQL Workbench
2. Conecte ao seu servidor MySQL
3. Abra o arquivo `create_and_populate_database.sql`
4. Execute o script (Ctrl+Shift+Enter)

## 👤 Usuários de Teste Criados

### Administrador
- **Email**: `admin@gmail.com`
- **Senha**: `Admin123`
- **Role**: `Gerente`
- **Funcionalidades**: Pode gerenciar hotéis, quartos, etc.

### Usuário Comum
- **Email**: `user@gmail.com`
- **Senha**: `User123`
- **Role**: `Consumidor`
- **Funcionalidades**: Pode visualizar hotéis, fazer reservas, etc.

## 🏨 Hotéis de Teste Criados

Todos os hotéis estão localizados em **Blumenau, SC**:

1. **Hotel Central Blumenau** (Centro) - 5 quartos
2. **Pousada Itoupava** (Itoupava Seca) - 3 quartos
3. **Residencial Itoupava Central** (Itoupava Central) - 4 quartos
4. **Hostel Itoupava Norte** (Itoupava Norte) - 3 quartos
5. **Casa Temporada Blumenau** (Itoupava Seca) - 1 casa completa

## 🔧 Configuração do Projeto

Após executar o script, configure a string de conexão no arquivo:
```
APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/appsettings.json
```

Exemplo de string de conexão:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=HealthGo;Uid=root;Pwd=sua_senha;"
  }
}
```

## 📊 Dados Inseridos

- ✅ 27 Estados brasileiros
- ✅ 30 Cidades principais
- ✅ 2 Usuários de teste
- ✅ 5 Hotéis em Blumenau
- ✅ 17 Quartos distribuídos
- ✅ 5 Lembretes de exemplo
- ✅ 8 Especialidades
- ✅ 2 Prestadores de serviço
- ✅ 3 Aeroportos
- ✅ 3 Aviões
- ✅ 6 Assentos
- ✅ 2 Voos
- ✅ 2 Passagens
- ✅ 2 Ordens de serviço

## ⚠️ Observações Importantes

1. **Senhas**: As senhas estão criptografadas com BCrypt (hash padrão)
2. **IDs Fixos**: Blumenau tem ID 61, Admin tem ID 1, User tem ID 2
3. **Dependências**: O script cria as tabelas na ordem correta para evitar erros de FK
4. **Compatibilidade**: Testado com MySQL 8.0+

## 🔄 Mudanças Recentes (v3.0)

### Funcionalidade de Cidade Automática
- **Mudança**: O sistema agora cria automaticamente cidades que não existem no banco
- **Funcionalidade**: 
  - ✅ Usuário informa nome da cidade e sigla do estado
  - ✅ Sistema busca a cidade no banco
  - ✅ Se não encontrar, cria automaticamente
  - ✅ Campo Cidade_Id continua obrigatório
- **Benefícios**:
  - ✅ Flexibilidade para cidades não cadastradas
  - ✅ Mantém integridade referencial
  - ✅ Experiência do usuário melhorada

### Como Funciona
1. **Cadastro de Pessoa**: Usuário informa `NomeCidade` e `SiglaEstado`
2. **Busca Automática**: Sistema busca cidade pelo nome
3. **Criação Automática**: Se não encontrar, cria nova cidade
4. **Associação**: Pessoa é cadastrada com o ID da cidade

### Scripts de Migração
```sql
-- Para bancos existentes, execute:
source APPS/database/migrate_pessoa_cidade_required.sql;
```

### Estrutura Atualizada
```sql
-- Campo obrigatório
Cidade_Id INT NOT NULL

-- Novos campos no DTO
NomeCidade VARCHAR(255)
SiglaEstado VARCHAR(2)
```

## 🔄 Mudanças Anteriores (v2.0)

### Campo Cidade_Id Opcional (REVERTIDO)
- **Status**: Revertido para obrigatório
- **Motivo**: Implementação da funcionalidade de cidade automática
- **Impacto**: 
  - ✅ Campo Cidade_Id é obrigatório
  - ✅ Sistema cria cidades automaticamente
  - ✅ Melhor experiência do usuário

## 🐛 Solução de Problemas

### Erro de Foreign Key
```sql
-- Se houver erro de FK, execute:
SET FOREIGN_KEY_CHECKS = 0;
-- Execute o script
SET FOREIGN_KEY_CHECKS = 1;
```

### Erro de Usuário Existente
```sql
-- Se os usuários já existem, execute:
DELETE FROM Pessoa WHERE Email IN ('admin@gmail.com', 'user@gmail.com');
-- Depois execute o script novamente
```

### Erro de Banco Existente
```sql
-- Se o banco já existe e você quer recriar:
DROP DATABASE IF EXISTS HealthGo;
-- Depois execute o script
```

## 📞 Suporte

Se encontrar problemas, verifique:
1. Versão do MySQL (recomendado 8.0+)
2. Permissões do usuário MySQL
3. Configuração de charset (UTF-8)
4. Logs de erro do MySQL

---

**🎉 Pronto! Seu banco de dados está configurado e pronto para uso!**
