namespace API_HealthGo.DTO
{
    public class HotelInsertDTO
    {
        public string CNPJ { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Site { get; set; } = string.Empty;
        public string Acessibilidade { get; set; } = string.Empty;
        public string CEP { get; set; } = string.Empty;
        public string Bairro { get; set; } = string.Empty;
        public string Rua { get; set; } = string.Empty;
        public string NumeroEndereco { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public bool Ativo { get; set; }
        public DateTime DataInicio { get; set; }
        public int Cidade_Id { get; set; } // Obrigatório
        public int Pessoa_Id { get; set; }
    }
}