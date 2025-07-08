namespace API_HealthGo.Entities
{
    public class AeroportoEntity
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string CodigoIata { get; set; }

        public int Cidade_Id { get; set; }
    }
}