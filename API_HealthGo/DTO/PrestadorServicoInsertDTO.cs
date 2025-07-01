namespace API_HealthGo.DTO
{
    public class PrestadorServicoInsertDTO
    {
        public decimal PrecoHora { get; set; }

        public string Observacao { get; set; }

        public string CNPJ { get; set; }

        public bool Ativo { get; set; }

        public int Especialidade_Id { get; set; }

        public int Pessoa_Id { get; set; }
    }
}
