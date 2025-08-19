# Padrão Estruturado para Hotéis - HealthGo

## Visão Geral

Este documento define o padrão estruturado para cadastro (POST) e visualização (GET) de hotéis no sistema HealthGo, garantindo consistência entre frontend e backend, especialmente para endereços, localizações, cidades e estados.

## 1. Estrutura de Dados

### 1.1 Tipos Base (Frontend - TypeScript)

```typescript
// Tipos base para endereço e localização
export interface Endereco {
  cep: string;
  rua: string;
  numeroEndereco: string;
  bairro: string;
  complemento?: string;
}

export interface Localizacao {
  cidade: {
    id: number;
    nome: string;
    estado_Id: number;
  };
  estado: {
    id: number;
    nome: string;
    sigla: string;
  };
}
```

### 1.2 Interface Principal do Hotel (GET Response)

```typescript
export interface Hotel {
  id: number;
  cnpj: string;
  nome: string;
  tipo: string;
  email: string;
  telefone: string;
  site?: string;
  acessibilidade?: string;
  descricao?: string;
  ativo: boolean;
  dataInicio: string;
  enderecoFoto?: string;
  
  // Endereço estruturado
  cep: string;
  rua: string;
  numeroEndereco: string;
  bairro: string;
  
  // Relacionamentos
  cidade_Id: number;
  pessoa_id: number;
  
  // Dados aninhados para localização (usado em filtros)
  cidade?: {
    id: number;
    nome: string;
    estado_Id: number;
    estado?: {
      id: number;
      nome: string;
      sigla: string;
    };
  };
}
```

### 1.3 Interface para Inserção (POST Request)

```typescript
export interface HotelInsertDTO {
  // Dados básicos
  cnpj: string;
  nome: string;
  tipo: string;
  email: string;
  telefone: string;
  site?: string;
  acessibilidade?: string;
  descricao?: string;
  ativo: boolean;
  dataInicio: string;
  
  // Endereço (obrigatório via ViaCEP)
  cep: string;
  rua: string;
  numeroEndereco: string;
  bairro: string;
  
  // Localização (obrigatório via ViaCEP)
  cidadeNome: string; // Nome da cidade obtido via ViaCEP
  estadoSigla: string; // Sigla do estado obtido via ViaCEP
  
  // Relacionamento
  pessoa_Id: number;
}
```

## 2. Backend - Estrutura de Dados

### 2.1 DTO de Inserção (C#)

```csharp
public class HotelInsertDTO
{
    // Dados básicos obrigatórios
    [JsonPropertyName("cnpj")]
    [Required(ErrorMessage = "CNPJ é obrigatório")]
    public string CNPJ { get; set; } = string.Empty;
    
    [JsonPropertyName("nome")]
    [Required(ErrorMessage = "Nome do hotel é obrigatório")]
    public string Nome { get; set; } = string.Empty;
    
    [JsonPropertyName("tipo")]
    [Required(ErrorMessage = "Tipo do hotel é obrigatório")]
    public string Tipo { get; set; } = string.Empty;
    
    [JsonPropertyName("email")]
    [Required(ErrorMessage = "Email é obrigatório")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    public string Email { get; set; } = string.Empty;
    
    [JsonPropertyName("telefone")]
    [Required(ErrorMessage = "Telefone é obrigatório")]
    public string Telefone { get; set; } = string.Empty;
    
    // Dados opcionais
    [JsonPropertyName("site")]
    public string? Site { get; set; }
    
    [JsonPropertyName("acessibilidade")]
    public string? Acessibilidade { get; set; }
    
    [JsonPropertyName("descricao")]
    public string? Descricao { get; set; }
    
    [JsonPropertyName("ativo")]
    public bool Ativo { get; set; } = true;
    
    [JsonPropertyName("dataInicio")]
    public DateTime DataInicio { get; set; } = DateTime.Now;
    
    // Endereço obrigatório (obtido via ViaCEP)
    [JsonPropertyName("cep")]
    [Required(ErrorMessage = "CEP é obrigatório")]
    [RegularExpression(@"^\d{8}$", ErrorMessage = "CEP deve ter 8 dígitos")]
    public string CEP { get; set; } = string.Empty;
    
    [JsonPropertyName("rua")]
    [Required(ErrorMessage = "Rua é obrigatória")]
    public string Rua { get; set; } = string.Empty;
    
    [JsonPropertyName("numeroEndereco")]
    [Required(ErrorMessage = "Número do endereço é obrigatório")]
    public string NumeroEndereco { get; set; } = string.Empty;
    
    [JsonPropertyName("bairro")]
    [Required(ErrorMessage = "Bairro é obrigatório")]
    public string Bairro { get; set; } = string.Empty;
    
    // Localização obrigatória (obtida via ViaCEP)
    [JsonPropertyName("cidadeNome")]
    [Required(ErrorMessage = "Nome da cidade é obrigatório")]
    public string CidadeNome { get; set; } = string.Empty;
    
    [JsonPropertyName("estadoSigla")]
    [Required(ErrorMessage = "Sigla do estado é obrigatória")]
    [StringLength(2, MinimumLength = 2, ErrorMessage = "Sigla do estado deve ter 2 caracteres")]
    public string EstadoSigla { get; set; } = string.Empty;
    
    // Relacionamento obrigatório
    [JsonPropertyName("pessoa_Id")]
    [Required(ErrorMessage = "ID da pessoa é obrigatório")]
    public int Pessoa_Id { get; set; }
}
```

### 2.2 DTO de Filtros

```csharp
public class HotelFiltroDTO : FiltroDTO
{
    [JsonPropertyName("tipo")]
    public string? Tipo { get; set; }
    
    [JsonPropertyName("cidade")]
    public string? Cidade { get; set; }
    
    [JsonPropertyName("estado")]
    public string? Estado { get; set; }
    
    [JsonPropertyName("ativo")]
    public bool? Ativo { get; set; }
    
    [JsonPropertyName("cep")]
    public string? CEP { get; set; }
    
    [JsonPropertyName("bairro")]
    public string? Bairro { get; set; }
}
```

## 3. Validações

### 3.1 Frontend (TypeScript)

```typescript
const validarFormulario = () => {
  const erros: string[] = [];

  // Validações obrigatórias
  if (!cnpj.replace(/\D/g, "")) erros.push("CNPJ é obrigatório");
  if (!nome.trim()) erros.push("Nome do hotel é obrigatório");
  if (!tipo) erros.push("Tipo de estabelecimento é obrigatório");
  if (!email.trim()) erros.push("Email é obrigatório");
  if (!telefone.replace(/\D/g, "")) erros.push("Telefone é obrigatório");
  if (!cep.replace(/\D/g, "")) erros.push("CEP é obrigatório");
  if (!rua.trim()) erros.push("Rua é obrigatória");
  if (!numeroEndereco.trim()) erros.push("Número do endereço é obrigatório");
  if (!bairro.trim()) erros.push("Bairro é obrigatório");
  if (!cidade.trim()) erros.push("Cidade é obrigatória");
  if (!estado.trim()) erros.push("Estado é obrigatório");

  // Validações de formato
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) erros.push("CEP deve ter 8 dígitos");
  
  const cnpjLimpo = cnpj.replace(/\D/g, "");
  if (cnpjLimpo.length !== 14) erros.push("CNPJ deve ter 14 dígitos");
  
  const telefoneLimpo = telefone.replace(/\D/g, "");
  if (telefoneLimpo.length < 10) erros.push("Telefone deve ter pelo menos 10 dígitos");

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() && !emailRegex.test(email)) erros.push("Email inválido");

  return erros;
};
```

### 3.2 Backend (C#)

```csharp
private async Task<MessageResponse> ValidateHotelBusinessRules(HotelInsertDTO hotel)
{
    // Validação de CEP (deve ter 8 dígitos)
    var cepLimpo = hotel.CEP.Replace(/\D/g, "");
    if (cepLimpo.Length != 8)
    {
        return new MessageResponse
        {
            Message = "CEP inválido",
            Errors = new List<string> { "O CEP deve ter 8 dígitos. Use a API ViaCEP para obter um CEP válido." }
        };
    }

    // Validação de CNPJ (deve ter 14 dígitos)
    var cnpjLimpo = hotel.CNPJ.Replace(/\D/g, "");
    if (cnpjLimpo.Length != 14)
    {
        return new MessageResponse
        {
            Message = "CNPJ inválido",
            Errors = new List<string> { "O CNPJ deve ter 14 dígitos." }
        };
    }

    // Validação de telefone (deve ter pelo menos 10 dígitos)
    var telefoneLimpo = hotel.Telefone.Replace(/\D/g, "");
    if (telefoneLimpo.Length < 10)
    {
        return new MessageResponse
        {
            Message = "Telefone inválido",
            Errors = new List<string> { "O telefone deve ter pelo menos 10 dígitos." }
        };
    }

    return new MessageResponse { IsValid = true };
}
```

## 4. Integração ViaCEP

### 4.1 Interface ViaCEP

```typescript
interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}
```

### 4.2 Processamento de Localização

```csharp
private async Task<int> ProcessarLocalizacao(string cidadeNome, string estadoSigla)
{
    try
    {
        // Buscar ou criar o estado
        var estado = await BuscarOuCriarEstado(estadoSigla);
        if (estado == null)
        {
            return 0;
        }

        // Buscar a cidade pelo nome
        var cidadeExistente = await _cidadeService.GetByNome(cidadeNome);
        
        if (cidadeExistente != null)
        {
            // Verificar se a cidade pertence ao estado correto
            if (cidadeExistente.Estado_Id == estado.Id)
            {
                return cidadeExistente.Id;
            }
            else
            {
                // Cidade existe mas em estado diferente, criar nova
                return await CriarCidade(cidadeNome, estado.Id);
            }
        }
        else
        {
            // Cidade não existe, criar nova
            return await CriarCidade(cidadeNome, estado.Id);
        }
    }
    catch (Exception)
    {
        return 0;
    }
}
```

## 5. Endpoints da API

### 5.1 POST /Hotel
- **Descrição**: Cadastra um novo hotel
- **Body**: `HotelInsertDTO`
- **Validações**: 
  - Dados obrigatórios
  - Formato de CEP, CNPJ, telefone
  - Localização via ViaCEP
- **Resposta**: `MessageResponse`

### 5.2 GET /Hotel
- **Descrição**: Lista todos os hotéis ativos
- **Query Parameters**: `HotelFiltroDTO`
- **Resposta**: `HotelGetAllResponse`

### 5.3 GET /Hotel/my-hotels
- **Descrição**: Lista hotéis do usuário logado
- **Autenticação**: JWT Token obrigatório
- **Resposta**: `HotelGetAllResponse`

### 5.4 GET /Hotel/{id}
- **Descrição**: Busca hotel por ID
- **Resposta**: `HotelEntity`

## 6. Filtros e Busca

### 6.1 Parâmetros de Filtro

```typescript
export interface HotelFilterDTO {
  search?: string;        // Busca por nome, descrição
  tipo?: string;          // Tipo de estabelecimento
  cidade?: string;        // Nome da cidade
  estado?: string;        // Sigla do estado
  ativo?: boolean;        // Status ativo/inativo
  limit?: number;         // Limite de resultados
  page?: number;          // Página atual
}
```

### 6.2 Exemplo de Uso em Filtros

```typescript
// Buscar hotéis por cidade
const response = await api.get('/Hotel', {
  params: {
    cidade: 'Blumenau',
    estado: 'SC',
    ativo: true
  }
});

// Buscar hotéis por tipo
const response = await api.get('/Hotel', {
  params: {
    tipo: 'Hotel',
    search: 'centro'
  }
});
```

## 7. Tratamento de Erros

### 7.1 Frontend

```typescript
try {
  const response = await api.post("/Hotel", hotelData);
  
  if (response.status === 201 || response.status === 200) {
    toast.success("Hotel cadastrado com sucesso!");
    navigate("/dashboard-gerente");
  }
} catch (error: any) {
  // Tratar erros de validação do backend
  if (error.response?.data?.errors) {
    const errosBackend = error.response.data.errors;
    toast.error("Dados inválidos", {
      description: Array.isArray(errosBackend) ? errosBackend.join(", ") : errosBackend
    });
  } else {
    toast.error("Erro ao cadastrar hotel. Verifique os dados e tente novamente.");
  }
}
```

### 7.2 Backend

```csharp
public class MessageResponse
{
    [JsonPropertyName("message")]
    public string Message { get; set; } = string.Empty;
    
    [JsonPropertyName("isValid")]
    public bool IsValid { get; set; } = true;
    
    [JsonPropertyName("errors")]
    public List<string>? Errors { get; set; }
    
    [JsonPropertyName("success")]
    public bool Success { get; set; } = true;
}
```

## 8. Considerações Importantes

### 8.1 Endereços e Localização
- **CEP obrigatório**: Deve ser obtido via ViaCEP
- **Cidade e Estado obrigatórios**: Preenchidos automaticamente via ViaCEP
- **Validação de dados reais**: Cidade e estado devem existir no Brasil
- **Consistência**: Dados de localização usados em filtros e outras funcionalidades

### 8.2 Formatação de Dados
- **CNPJ**: 14 dígitos (formatação: XX.XXX.XXX/XXXX-XX)
- **Telefone**: Mínimo 10 dígitos (formatação: (XX) XXXXX-XXXX)
- **CEP**: 8 dígitos (formatação: XXXXX-XXX)

### 8.3 Segurança
- **Autenticação**: JWT Token obrigatório para operações sensíveis
- **Validação**: Dados validados tanto no frontend quanto no backend
- **Sanitização**: Dados limpos antes de salvar no banco

### 8.4 Performance
- **Paginação**: Implementada em todas as listagens
- **Filtros**: Otimizados para busca eficiente
- **Cache**: Considerar cache para dados de cidade/estado

## 9. Exemplos de Uso

### 9.1 Cadastro de Hotel

```typescript
const hotelData: HotelInsertDTO = {
  cnpj: "12345678000101",
  nome: "Hotel Exemplo",
  tipo: "Hotel",
  email: "contato@hotelexemplo.com",
  telefone: "4733331111",
  site: "https://hotelexemplo.com",
  acessibilidade: "Rampas de acesso",
  descricao: "Hotel localizado no centro da cidade",
  ativo: true,
  dataInicio: new Date().toISOString(),
  cep: "89010000",
  rua: "Rua XV de Novembro",
  numeroEndereco: "100",
  bairro: "Centro",
  cidadeNome: "Blumenau",
  estadoSigla: "SC",
  pessoa_Id: 1
};
```

### 9.2 Filtro de Hotéis

```typescript
const filtros: HotelFilterDTO = {
  search: "centro",
  tipo: "Hotel",
  cidade: "Blumenau",
  estado: "SC",
  ativo: true,
  limit: 10,
  page: 0
};
```

Este padrão garante consistência, segurança e usabilidade em todo o sistema de hotéis do HealthGo.
