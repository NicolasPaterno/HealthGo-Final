namespace API_HealthGo.DTO
{
    public class OrdemServicoInsertDTO
    {
        public DateTime DataCriacao { get; set; }

        public string StatusOS { get; set; }

        public string FormaPagamento { get; set; }

        public int Pessoa_Id { get; set; }
    }
}
