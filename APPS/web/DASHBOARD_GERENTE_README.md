# Dashboard do Gerente de Hotel - HealthGo

## Visão Geral

O dashboard do gerente de hotel foi desenvolvido para fornecer uma visão completa e funcional das operações hoteleiras no sistema HealthGo. Ele oferece métricas em tempo real, alertas inteligentes e ferramentas de gestão para otimizar a administração dos hotéis.

## Funcionalidades Principais

### 📊 Métricas Principais
- **Total de Hotéis**: Número de hotéis cadastrados pelo gerente
- **Total de Quartos**: Quantidade total de quartos disponíveis
- **Receita Total**: Receita total (atualmente zerada)
- **Taxa de Ocupação**: Percentual de ocupação dos quartos (simulado)
- **Preço Médio**: Valor médio por quarto por noite
- **Capacidade Total**: Número total de pessoas que podem ser acomodadas

### 🏨 Gestão de Hotéis
- **Lista de Hotéis**: Visualização de todos os hotéis do gerente
- **Seleção de Hotel**: Possibilidade de alternar entre diferentes hotéis
- **Status dos Hotéis**: Indicação visual se o hotel está ativo ou inativo
- **Informações de Localização**: Cidade e estado do hotel
- **Skeleton de Carregamento**: Indicador visual durante o carregamento dos hotéis

### 📈 Gráficos e Visualizações
- **Gráfico de Ocupação**: Visualização da taxa de ocupação com comparação ao mês anterior
- **Barra de Progresso**: Indicador visual da ocupação com cores baseadas na performance
- **Tendências**: Indicadores de crescimento ou declínio nas métricas



### ⚡ Ações Rápidas
- **Gerenciar Quartos**: Acesso direto à página de gestão de quartos
- **Adicionar Hotel**: Criação de novos hotéis

## Tecnologias Utilizadas

### Frontend
- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **Sonner** para notificações
- **Shadcn/ui** para componentes

### Backend
- **.NET 7.0** Web API
- **MySQL** para banco de dados
- **JWT** para autenticação

## Endpoints Utilizados

### Hotel
- `GET /Hotel/my-hotels` - Lista hotéis do gerente autenticado

### Quartos
- `GET /Quarto/hotel/{hotelId}` - Lista quartos de um hotel específico


## Estrutura de Arquivos

```
APPS/web/src/
├── app/dashboard/
│   ├── DashboardGerentePage.tsx      # Layout principal
│   └── DashboardGerenteContent.tsx   # Conteúdo do dashboard
├── components/
│   ├── occupancy-chart.tsx          # Gráfico de ocupação
│   ├── hotel-alerts.tsx             # Sistema de alertas
│   └── ui/                          # Componentes base
└── services/
    └── api.ts                       # Configuração da API
```

## Como Usar

### 1. Acesso ao Dashboard
- Faça login como gerente de hotel
- Acesse `/dashboard-gerente` na aplicação
- O dashboard carregará automaticamente os dados

### 2. Navegação
- Use os botões de ação rápida para navegar entre funcionalidades
- Clique nos hotéis para alternar entre eles
- Monitore os alertas para tomar ações necessárias

### 3. Gestão de Dados
- Os dados são atualizados automaticamente
- Use os botões para adicionar hotéis e quartos
- Monitore as métricas para otimizar operações

## Recursos Futuros

### Planejados
- [ ] Relatórios detalhados com gráficos avançados
- [ ] Exportação de dados para Excel/PDF
- [ ] Notificações em tempo real
- [ ] Integração com sistema de reservas
- [ ] Análise de tendências históricas
- [ ] Comparação entre hotéis
- [ ] Metas e objetivos personalizáveis

### Melhorias Técnicas
- [ ] Cache de dados para melhor performance
- [ ] Atualização automática de dados
- [ ] Filtros avançados
- [ ] Paginação para grandes volumes de dados
- [ ] Modo offline básico

## Configuração

### Variáveis de Ambiente
```env
VITE_API_URL=https://localhost:7243
VITE_API_TIMEOUT=10000
```

### Dependências
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "lucide-react": "^0.263.1",
    "sonner": "^1.2.0",
    "tailwindcss": "^3.3.0"
  }
}
```

## Troubleshooting

### Problemas Comuns

1. **Dados não carregam**
   - Verifique se o backend está rodando
   - Confirme se o usuário está autenticado
   - Verifique a conexão com a API

2. **Alertas não aparecem**
   - Os alertas são baseados nos dados carregados
   - Verifique se há hotéis e quartos cadastrados

3. **Erro de permissão**
   - Confirme se o usuário tem role de "Gerente"
   - Verifique o token de autenticação

### Logs Úteis
- Console do navegador para erros de frontend
- Logs do backend para problemas de API
- Network tab para verificar requisições

## Contribuição

Para contribuir com melhorias no dashboard:

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste thoroughly
5. Submeta um pull request

## Suporte

Para suporte técnico ou dúvidas sobre o dashboard:
- Abra uma issue no repositório
- Consulte a documentação da API
- Entre em contato com a equipe de desenvolvimento
