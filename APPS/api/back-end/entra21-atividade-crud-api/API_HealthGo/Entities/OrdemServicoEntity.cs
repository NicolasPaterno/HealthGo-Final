namespace API_HealthGo.Entities
{
    public class OrdemServicoEntity
    {
        public int Id { get; set; }

        public DateTime DataCriacao { get; set; }

        public string StatusOS { get; set; } // ENUM('Concluído', 'Em andamento', 'Cancelado')

        public string FormaPagamento { get; set; }

        public int Pessoa_Id { get; set; }
    }
}
