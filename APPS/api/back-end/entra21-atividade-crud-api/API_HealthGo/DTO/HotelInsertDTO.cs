namespace API_HealthGo.DTO
{
    public class HotelInsertDTO
    {
        public string CNPJ { get; set; }

        public string Nome { get; set; }

        public string Tipo { get; set; } // ENUM('Casa', 'Apartamento', 'Hostel', 'Pousada', 'Hotel')

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

        public int Cidade_Id { get; set; }

        public int ContaGerencia_Id { get; set; }
    }
}
