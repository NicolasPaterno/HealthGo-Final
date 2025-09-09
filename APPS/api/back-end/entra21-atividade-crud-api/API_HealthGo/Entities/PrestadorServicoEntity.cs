namespace API_HealthGo.Entities
{
    public class PrestadorServicoEntity
    {
        public int Id { get; set; }

        public string Observacao { get; set; }

        public string CNPJ { get; set; }

        public int Pessoa_Id { get; set; }
    }
}
