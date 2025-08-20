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

// Interface principal do Hotel (GET response)
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

  // Coordenadas geográficas (opcionais)
  latitude?: number;
  longitude?: number;

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

// Interface para inserção de hotel (POST request)
export interface HotelInsertDTO {
  // Dados básicos obrigatórios
  CNPJ: string;
  Nome: string;
  Tipo: string;
  Email: string;
  Telefone: string;
  Site?: string | null;
  Acessibilidade?: string | null;
  Descricao?: string | null;
  Ativo: boolean;
  DataInicio: string;

  // Endereço obrigatório
  CEP: string;
  Rua: string;
  NumeroEndereco: string;
  Bairro: string;

  // Localização obrigatória
  CidadeNome: string;
  EstadoSigla: string;

  // Coordenadas geográficas (opcionais)
  Latitude?: number | null;
  Longitude?: number | null;

  // Relacionamento obrigatório
  Pessoa_Id: number;
}

// Interface para atualização de hotel
export interface HotelUpdateDTO {
  id: number;
  cnpj?: string;
  nome?: string;
  tipo?: string;
  email?: string;
  telefone?: string;
  site?: string;
  acessibilidade?: string;
  descricao?: string;
  ativo?: boolean;

  // Endereço opcional na atualização
  cep?: string;
  rua?: string;
  numeroEndereco?: string;
  bairro?: string;

  // Localização opcional na atualização
  cidadeNome?: string;
  estadoSigla?: string;
}

// Interface para filtros de busca
export interface HotelFilterDTO {
  search?: string;
  tipo?: string;
  cidade?: string;
  estado?: string;
  ativo?: boolean;
  limit?: number;
  page?: number;
}

// Interface para resposta de listagem com paginação
export interface HotelListResponse {
  data: Hotel[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
