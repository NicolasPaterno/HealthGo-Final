export interface Hospital {
  COMP: string;
  nome: string;
  razaoSocial: string;
  naturezaJuridica: string;
  tipoUnidade: string;
  uf: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numeroEndereco: string;
  cep: string;
  numero: string;
}

export interface HospitalResponse {
  data: Hospital[];
  total: number;
}
