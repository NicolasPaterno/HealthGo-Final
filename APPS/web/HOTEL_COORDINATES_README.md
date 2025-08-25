# 🗺️ Coordenadas Geográficas para Hotéis

## Visão Geral
O HealthGo agora suporta coordenadas geográficas (latitude e longitude) para hotéis, permitindo que apareçam no mapa interativo. Este recurso é essencial para uma experiência completa de localização.

## ✨ Funcionalidades Implementadas

### 1. **Cadastro com Coordenadas**
- Campos de latitude e longitude no formulário de cadastro
- Validação automática de coordenadas válidas
- Geocodificação automática via CEP
- Validação em tempo real

### 2. **Geocodificação Automática**
- **Via CEP**: Coordenadas são buscadas automaticamente ao preencher o CEP
- **Manual**: Botão para buscar coordenadas de endereços já preenchidos
- **API**: Usa OpenStreetMap Nominatim (gratuito e confiável)

### 3. **Validação Inteligente**
- Latitude: deve estar entre -90 e 90
- Longitude: deve estar entre -180 e 180
- Feedback visual em tempo real
- Prevenção de dados inválidos

## 🚀 Como Usar

### Cadastro de Novo Hotel

1. **Preencha o CEP**
   - Digite o CEP e pressione Enter ou clique fora
   - O sistema busca o endereço automaticamente
   - As coordenadas são geocodificadas automaticamente

2. **Verifique as Coordenadas**
   - Após o CEP, as coordenadas aparecem automaticamente
   - Status verde indica coordenadas válidas
   - Status laranja indica coordenadas pendentes

3. **Ajuste Manual (Opcional)**
   - Edite latitude e longitude se necessário
   - Use o botão "Buscar Coordenadas" para recalcular
   - Validação em tempo real

### Campos de Coordenadas

- **Latitude**: Número entre -90 e 90 (ex: -23.5505 para São Paulo)
- **Longitude**: Número entre -180 e 180 (ex: -46.6333 para São Paulo)
- **Formato**: Decimal com até 6 casas decimais
- **Opcional**: Hotéis sem coordenadas funcionam normalmente, mas não aparecem no mapa

## 🛠️ Configuração Técnica

### Frontend (React)
- ✅ Campos de entrada para latitude/longitude
- ✅ Validação em tempo real
- ✅ Geocodificação automática
- ✅ Feedback visual do status

### Backend (.NET)
- ✅ Entidade `HotelEntity` com campos de coordenadas
- ✅ DTO `HotelInsertDTO` com suporte a coordenadas
- ✅ Repositório atualizado para salvar coordenadas
- ✅ Consultas retornam coordenadas quando disponíveis

### Banco de Dados
- ✅ Colunas `latitude` e `longitude` na tabela `Hotel`
- ✅ Tipo `DECIMAL(10,8)` para latitude
- ✅ Tipo `DECIMAL(11,8)` para longitude
- ✅ Campos opcionais (NULL permitido)

## 📱 Interface do Usuário

### Seção de Coordenadas
```
🗺️ Coordenadas Geográficas [✅ Válidas]

💡 Dica: As coordenadas são essenciais para que seu hotel apareça no mapa. 
Elas são preenchidas automaticamente quando você busca o CEP, mas você também pode inserir manualmente.

[🌐 Buscar Coordenadas] [✅ Pronto para o mapa!]

Latitude (-90 a 90)     Longitude (-180 a 180)
[     -23.5505    ]     [     -46.6333    ]

✅ Coordenadas válidas: -23.550500, -46.633300
                        [🗺️ Aparecerá no mapa]
```

### Status Visual
- **🟢 Verde**: Coordenadas válidas, hotel aparecerá no mapa
- **🟠 Laranja**: Coordenadas pendentes, hotel não aparecerá no mapa
- **🔴 Vermelho**: Coordenadas inválidas, erro de validação

## 🔧 Configuração do Banco de Dados

### 1. Execute o Script SQL
```sql
-- Arquivo: update_hotel_coordinates.sql
ALTER TABLE Hotel 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8) NULL,
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8) NULL;
```

### 2. Verifique a Estrutura
```sql
DESCRIBE Hotel;
```

### 3. Teste com Dados Existentes
```sql
-- Contar hotéis com e sem coordenadas
SELECT 
    COUNT(*) as total_hoteis,
    COUNT(latitude) as com_coordenadas,
    COUNT(*) - COUNT(latitude) as sem_coordenadas
FROM Hotel;
```

## 📊 Exemplos de Coordenadas

### Cidades Brasileiras
| Cidade | Latitude | Longitude |
|--------|----------|-----------|
| São Paulo | -23.5505 | -46.6333 |
| Rio de Janeiro | -22.9068 | -43.1729 |
| Brasília | -15.7942 | -47.8822 |
| Salvador | -12.9714 | -38.5011 |
| Fortaleza | -3.7319 | -38.5267 |

### Como Encontrar Coordenadas
1. **Google Maps**: Clique direito → "O que há aqui?"
2. **OpenStreetMap**: Clique direito → "Mostrar coordenadas"
3. **Geocodificação**: Use o botão "Buscar Coordenadas" no formulário

## 🔍 Troubleshooting

### Coordenadas não são salvas
1. Verifique se o backend foi atualizado
2. Confirme se as colunas existem no banco
3. Verifique os logs do backend

### Geocodificação falha
1. Verifique a conexão com a internet
2. Confirme se o endereço está completo
3. Tente inserir coordenadas manualmente

### Validação sempre falha
1. Verifique o formato das coordenadas
2. Confirme se estão nos intervalos corretos
3. Use números decimais (ex: -23.5505, não -23,5505)

## 🚀 Próximas Melhorias

### Funcionalidades Planejadas
- [ ] Cache de coordenadas geocodificadas
- [ ] Múltiplas APIs de geocodificação
- [ ] Validação de endereços existentes
- [ ] Importação em lote de coordenadas

### Otimizações
- [ ] Geocodificação em background
- [ ] Validação de coordenadas duplicadas
- [ ] Sistema de coordenadas aproximadas
- [ ] Integração com APIs de qualidade de dados

## 📚 Recursos Adicionais

### APIs de Geocodificação
- [Nominatim](https://nominatim.org/) - OpenStreetMap (gratuito)
- [Google Geocoding](https://developers.google.com/maps/documentation/geocoding) - Google Maps (pago)
- [MapBox Geocoding](https://docs.mapbox.com/api/search/geocoding/) - MapBox (pago)

### Ferramentas de Validação
- [Coordinate Validator](https://www.latlong.net/) - Validação online
- [Decimal Degrees](https://en.wikipedia.org/wiki/Decimal_degrees) - Formato de coordenadas

---

**Nota**: As coordenadas são essenciais para uma experiência completa no mapa. Sem elas, os hotéis funcionam normalmente mas não aparecem na visualização geográfica.
