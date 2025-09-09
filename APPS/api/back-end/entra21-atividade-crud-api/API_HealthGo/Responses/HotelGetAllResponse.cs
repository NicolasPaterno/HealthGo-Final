using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class HotelGetAllResponse
    {
        public IEnumerable<HotelEntity> Data { get; set; }
    }

    // DTO específico para hotéis com dados de cidade e estado
    public class HotelWithLocationDTO
    {
        public int Id { get; set; }
        public string CNPJ { get; set; }
        public string Nome { get; set; }
        public string Tipo { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Site { get; set; }
        public string Acessibilidade { get; set; }
        public string CEP { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string NumeroEndereco { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataInicio { get; set; }
        public int Pessoa_Id { get; set; }
        public int Cidade_Id { get; set; }
        
        // Coordenadas geográficas
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        
        // Dados de cidade
        public int CidadeId { get; set; }
        public string CidadeNome { get; set; }
        public int CidadeEstadoId { get; set; }
        
        // Dados de estado
        public int EstadoId { get; set; }
        public string EstadoNome { get; set; }
        public string EstadoSigla { get; set; }
    }
}
