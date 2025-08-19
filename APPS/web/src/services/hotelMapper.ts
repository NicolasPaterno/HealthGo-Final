import type { Hotel, HotelInsertDTO, HotelUpdateDTO } from '@/types/hotel';

// Funções de mapeamento para converter entre estruturas do frontend e backend

/**
 * Converte dados do formulário para HotelInsertDTO (POST)
 */
export const toInsertDTO = (formData: any, pessoaId: number): HotelInsertDTO => {
  return {
    CNPJ: formData.cnpj?.replace(/\D/g, "") || "",
    Nome: formData.nome?.trim() || "",
    Tipo: formData.tipo || "",
    Email: formData.email?.trim() || "",
    Telefone: formData.telefone?.replace(/\D/g, "") || "",
    Site: formData.site?.trim() || null,
    Acessibilidade: formData.acessibilidade?.trim() || null,
    CEP: formData.cep?.replace(/\D/g, "") || "",
    Bairro: formData.bairro?.trim() || "",
    Rua: formData.rua?.trim() || "",
    NumeroEndereco: formData.numeroEndereco?.trim() || "",
    Descricao: formData.descricao?.trim() || null,
    Ativo: formData.ativo !== undefined ? formData.ativo : true,
    DataInicio: formData.dataInicio || new Date().toISOString(),
    CidadeNome: formData.cidade?.trim() || "",
    EstadoSigla: formData.estado?.trim() || "",
    Pessoa_Id: pessoaId
  };
};

/**
 * Converte Hotel (GET) para HotelUpdateDTO (PUT)
 */
export const toUpdateDTO = (hotel: Hotel): HotelUpdateDTO => {
  return {
    Id: hotel.id,
    CNPJ: hotel.cnpj,
    Nome: hotel.nome,
    Tipo: hotel.tipo,
    Email: hotel.email,
    Telefone: hotel.telefone,
    Site: hotel.site,
    Acessibilidade: hotel.acessibilidade,
    Descricao: hotel.descricao,
    Ativo: hotel.ativo,
    DataInicio: hotel.dataInicio,
    CEP: hotel.cep,
    Rua: hotel.rua,
    NumeroEndereco: hotel.numeroEndereco,
    Bairro: hotel.bairro,
    Cidade_Id: hotel.cidade_Id,
    Pessoa_Id: hotel.pessoa_id
  };
};

/**
 * Converte HotelEntity do backend para Hotel do frontend
 */
export const fromEntity = (entity: any): Hotel => {
  return {
    id: entity.Id || entity.id,
    cnpj: entity.CNPJ || entity.cnpj,
    nome: entity.Nome || entity.nome,
    tipo: entity.Tipo || entity.tipo,
    email: entity.Email || entity.email,
    telefone: entity.Telefone || entity.telefone,
    site: entity.Site || entity.site,
    acessibilidade: entity.Acessibilidade || entity.acessibilidade,
    descricao: entity.Descricao || entity.descricao,
    ativo: entity.Ativo !== undefined ? entity.Ativo : entity.ativo,
    dataInicio: entity.DataInicio || entity.dataInicio,
    cep: entity.CEP || entity.cep,
    rua: entity.Rua || entity.rua,
    numeroEndereco: entity.NumeroEndereco || entity.numeroEndereco,
    bairro: entity.Bairro || entity.bairro,
    cidade_Id: entity.Cidade_Id || entity.cidade_Id,
    pessoa_id: entity.Pessoa_Id || entity.pessoa_id,
    cidade: entity.Cidade ? {
      id: entity.Cidade.Id || entity.Cidade.id,
      nome: entity.Cidade.Nome || entity.Cidade.nome,
      estado_Id: entity.Cidade.Estado_Id || entity.Cidade.estado_Id,
      estado: entity.Cidade.Estado ? {
        id: entity.Cidade.Estado.Id || entity.Cidade.Estado.id,
        nome: entity.Cidade.Estado.Nome || entity.Cidade.Estado.nome,
        sigla: entity.Cidade.Estado.Sigla || entity.Cidade.Estado.sigla
      } : undefined
    } : undefined
  };
};

/**
 * Converte lista de entidades do backend para lista de Hotels do frontend
 */
export const fromEntityList = (entities: any[]): Hotel[] => {
  return entities.map(fromEntity);
};

/**
 * Valida se um objeto é um Hotel válido
 */
export const isValidHotel = (hotel: any): hotel is Hotel => {
  return hotel && 
         typeof hotel.id === 'number' &&
         typeof hotel.nome === 'string' &&
         typeof hotel.cnpj === 'string' &&
         typeof hotel.tipo === 'string' &&
         typeof hotel.email === 'string' &&
         typeof hotel.telefone === 'string';
};

/**
 * Formata dados para exibição
 */
export const formatHotelForDisplay = (hotel: Hotel) => {
  return {
    ...hotel,
    cnpjFormatted: hotel.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"),
    telefoneFormatted: hotel.telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3"),
    cepFormatted: hotel.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2"),
    enderecoCompleto: `${hotel.rua}, ${hotel.numeroEndereco} - ${hotel.bairro}`,
    cidadeEstado: hotel.cidade ? 
      `${hotel.cidade.nome}${hotel.cidade.estado ? `, ${hotel.cidade.estado.sigla}` : ''}` : 
      'Não informado'
  };
};

