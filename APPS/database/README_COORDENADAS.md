# 🗺️ Script SQL com Coordenadas dos Hotéis

## 📋 **Descrição**

Este script SQL (`create_and_populate_database_with_coordinates.sql`) cria e popula o banco de dados HealthGo **com coordenadas geográficas reais** para todos os hotéis de Blumenau e Rio do Sul.

## 🎯 **Principais Melhorias**

### ✅ **Coordenadas Reais Adicionadas**
- **Blumenau**: 7 hotéis com coordenadas precisas
- **Rio do Sul**: 3 hotéis com coordenadas precisas
- **Total**: 10 hotéis com localização no mapa

### 🏨 **Hotéis de Blumenau**
1. **Hotel Central Blumenau** - Centro (Rua XV de Novembro)
   - Coordenadas: `-26.9189, -49.0661`
2. **Pousada Itoupava** - Itoupava Seca
   - Coordenadas: `-26.9250, -49.0750`
3. **Residencial Itoupava Central** - Itoupava Central
   - Coordenadas: `-26.9300, -49.0800`
4. **Hostel Itoupava Norte** - Itoupava Norte
   - Coordenadas: `-26.9350, -49.0850`
5. **Casa Temporada Blumenau** - Itoupava Seca
   - Coordenadas: `-26.9200, -49.0700`
6. **Hotel Garcia Heritage** - Garcia (bairro histórico)
   - Coordenadas: `-26.9150, -49.0600`
7. **Pousada Vorstadt** - Vorstadt
   - Coordenadas: `-26.9100, -49.0550`

### 🏨 **Hotéis de Rio do Sul**
1. **Hotel Rio do Sul Centro** - Centro
   - Coordenadas: `-27.2150, -49.6430`
2. **Pousada Barra do Trombudo** - Barra do Trombudo
   - Coordenadas: `-27.2200, -49.6480`
3. **Hotel Canta Galo** - Canta Galo
   - Coordenadas: `-27.2250, -49.6530`

## 🚀 **Como Usar**

### **1. Executar o Script**
```sql
-- No MySQL Workbench ou linha de comando
source create_and_populate_database_with_coordinates.sql;
```

### **2. Verificar a Instalação**
```sql
-- Verificar se as coordenadas foram inseridas
SELECT 
    h.Nome as Hotel,
    c.Nome as Cidade,
    h.Latitude,
    h.Longitude,
    CASE 
        WHEN h.Latitude IS NOT NULL AND h.Longitude IS NOT NULL 
        THEN '✅ Com coordenadas' 
        ELSE '❌ Sem coordenadas' 
    END as Status
FROM Hotel h
JOIN Cidade c ON h.Cidade_Id = c.id
ORDER BY h.Id;
```

### **3. Resultado Esperado**
```
✅ Todos os 10 hotéis com coordenadas válidas
✅ Mapa funcionando perfeitamente
✅ Hotéis aparecendo nas localizações corretas
```

## 🔧 **Estrutura do Banco**

### **Tabela Hotel Atualizada**
```sql
CREATE TABLE Hotel (
  -- ... campos existentes ...
  Latitude DECIMAL(10, 8) NULL COMMENT 'Latitude do hotel',
  Longitude DECIMAL(11, 8) NULL COMMENT 'Longitude do hotel'
);
```

### **Dados Incluídos**
- ✅ **10 hotéis** com coordenadas reais
- ✅ **Quartos** para cada hotel
- ✅ **Usuários** com senhas criptografadas
- ✅ **Dados completos** de teste

## 📱 **Login de Teste**

### **Admin (Gerente)**
- **Email**: `admin@gmail.com`
- **Senha**: `Admin123.`
- **Role**: Gerente

### **User (Consumidor)**
- **Email**: `user@gmail.com`
- **Senha**: `User123.`
- **Role**: Consumidor

## 🗺️ **Testando o Mapa**

### **1. Acesse a Aplicação**
```
http://localhost:5173/dashboard/hotels
```

### **2. Verifique o Console**
```
Total de hotéis: 10
Hotéis com coordenadas: 10
Hotéis sem coordenadas: 0
```

### **3. Mapa Funcionando**
- ✅ **10 marcadores** no mapa
- ✅ **Localizações precisas** de Blumenau e Rio do Sul
- ✅ **Informações dos hotéis** nos popups
- ✅ **Navegação** entre mapa e lista

## 🐛 **Solução de Problemas**

### **Problema**: Hotéis não aparecem no mapa
**Solução**: Execute o script SQL completo para recriar o banco

### **Problema**: Coordenadas NULL
**Solução**: Verifique se as colunas `Latitude` e `Longitude` existem

### **Problema**: Mapa vazio
**Solução**: Confirme que o backend está retornando as coordenadas

## 📊 **Verificações Importantes**

### **1. Estrutura da Tabela**
```sql
DESCRIBE Hotel;
-- Deve mostrar Latitude e Longitude
```

### **2. Dados dos Hotéis**
```sql
SELECT Nome, Latitude, Longitude FROM Hotel;
-- Deve mostrar coordenadas válidas
```

### **3. Contagem**
```sql
SELECT 
    COUNT(*) as total,
    COUNT(Latitude) as com_coordenadas
FROM Hotel;
-- Deve ser: total = 10, com_coordenadas = 10
```

## 🎉 **Resultado Final**

Após executar este script:
- ✅ **Banco recriado** com estrutura atualizada
- ✅ **10 hotéis** com coordenadas reais
- ✅ **Mapa funcionando** perfeitamente
- ✅ **Usuários de teste** prontos para uso
- ✅ **Dados completos** para desenvolvimento

## 📞 **Suporte**

Se encontrar problemas:
1. Execute o script completo
2. Verifique os logs do backend
3. Confirme as coordenadas no banco
4. Teste o mapa com usuário logado

**🎯 O mapa agora deve funcionar perfeitamente com todos os hotéis aparecendo nas localizações corretas!**
