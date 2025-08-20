# 🗺️ Funcionalidades do Mapa de Hotéis

## Visão Geral
O HealthGo agora inclui um mapa interativo para visualizar hotéis, similar ao Airbnb. Os usuários podem alternar entre visualização de lista tradicional e visualização de mapa.

## ✨ Funcionalidades Principais

### 1. **Visualização Dupla**
- **Aba Lista**: Visualização tradicional em cards
- **Aba Mapa**: Mapa interativo com marcadores dos hotéis

### 2. **Mapa Interativo**
- Mapa baseado em OpenStreetMap (gratuito e confiável)
- Marcadores personalizados para cada hotel
- Popups informativos com detalhes do hotel
- Zoom automático para mostrar todos os hotéis
- Coordenadas padrão centralizadas no Brasil

### 3. **Funcionalidades do Mapa**
- **Marcadores**: Cada hotel aparece como um pin no mapa
- **Popups**: Clique nos marcadores para ver informações rápidas
- **Seleção**: Clique nos hotéis para selecioná-los
- **Navegação**: Botão "Como Chegar" abre Google Maps
- **Responsivo**: Funciona em dispositivos móveis e desktop

### 4. **Geocodificação Automática**
- Sistema para adicionar coordenadas automaticamente
- Usa OpenStreetMap Nominatim para converter endereços
- Botão "Geocodificar Endereço" para hotéis sem coordenadas
- Status visual do processo de geocodificação

### 5. **Filtros Integrados**
- Todos os filtros existentes funcionam com o mapa
- Hotéis filtrados aparecem automaticamente no mapa
- Contador de hotéis visíveis no mapa

## 🚀 Como Usar

### Alternar entre Visualizações
1. Na página de hotéis (`/dashboard/hotels`)
2. Use os botões "Lista" e "Mapa" no topo da página
3. O mapa mostra apenas hotéis com coordenadas válidas

### Interagir com o Mapa
1. **Zoom**: Use scroll do mouse ou botões +/- do mapa
2. **Pan**: Arraste o mapa para navegar
3. **Marcadores**: Clique nos pins para ver detalhes
4. **Seleção**: Clique nos hotéis para selecioná-los

### Geocodificar Endereços
1. Hotéis sem coordenadas aparecem com aviso laranja
2. Clique no botão "🌐" para geocodificar automaticamente
3. O sistema converte endereço em coordenadas
4. Após sucesso, o hotel aparece no mapa

## 🛠️ Configuração Técnica

### Dependências Instaladas
```bash
npm install react-leaflet leaflet @types/leaflet
```

### Arquivos Criados
- `src/components/hotels-map.tsx` - Componente principal do mapa
- `src/components/hotels-map.css` - Estilos personalizados
- `src/types/hotel.ts` - Atualizado com campos de coordenadas

### Banco de Dados
- Adicione colunas `latitude` e `longitude` na tabela `Hotel`
- Execute o script `add_coordinates_example.sql` para dados de exemplo

## 📱 Responsividade

### Desktop
- Mapa e lista lado a lado (modo split)
- Mapa grande (384px altura)
- Controles completos visíveis

### Mobile
- Mapa responsivo (300px altura)
- Controles adaptados para touch
- Navegação otimizada para dispositivos móveis

## 🎨 Personalização

### Cores e Temas
- Suporte completo ao modo escuro
- Cores consistentes com o design system
- Ícones personalizados para marcadores

### Estilos do Mapa
- Popups estilizados com Tailwind CSS
- Sombras e bordas arredondadas
- Transições suaves nos marcadores

## 🔧 Troubleshooting

### Mapa não carrega
1. Verifique se as dependências foram instaladas
2. Confirme se há hotéis com coordenadas válidas
3. Verifique o console do navegador para erros

### Hotéis não aparecem no mapa
1. Verifique se os hotéis têm `latitude` e `longitude`
2. Execute o script SQL para adicionar coordenadas
3. Use a geocodificação automática para hotéis sem coordenadas

### Performance
1. O mapa carrega apenas quando necessário
2. Marcadores são renderizados de forma eficiente
3. Zoom automático otimizado para melhor experiência

## 🚀 Próximas Melhorias

### Funcionalidades Planejadas
- [ ] Clustering de marcadores para muitas localizações
- [ ] Filtros por distância/raio
- [ ] Integração com APIs de trânsito
- [ ] Múltiplas camadas de mapa (satélite, terreno)
- [ ] Histórico de localizações visitadas

### Otimizações
- [ ] Lazy loading de marcadores
- [ ] Cache de coordenadas geocodificadas
- [ ] Compressão de dados de localização
- [ ] PWA para uso offline

## 📚 Recursos Adicionais

### Documentação
- [Leaflet.js](https://leafletjs.com/) - Biblioteca de mapas
- [React Leaflet](https://react-leaflet.js.org/) - Integração React
- [OpenStreetMap](https://www.openstreetmap.org/) - Dados de mapa

### APIs Relacionadas
- [Nominatim](https://nominatim.org/) - Geocodificação
- [Google Maps](https://developers.google.com/maps) - Navegação
- [MapBox](https://www.mapbox.com/) - Alternativa premium

---

**Nota**: Este mapa foi implementado seguindo as melhores práticas de UX do Airbnb, proporcionando uma experiência familiar e intuitiva para os usuários.
