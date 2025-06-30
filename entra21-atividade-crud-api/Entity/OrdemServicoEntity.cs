namespace API_HealthGo.Entity
{
    public class OrdemServicoEntity
    {
        public int Id { get; set; }

        public DateTime DataCriacao { get; set; }

        public string StatusOS { get; set; }

        public int Pessoa_id { get; set; }
    }
}
