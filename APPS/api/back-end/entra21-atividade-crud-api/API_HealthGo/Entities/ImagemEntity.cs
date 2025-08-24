namespace API_HealthGo.Entities
{
    public class ImagemEntity
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Descricao { get; set; }

        public int Hotel_Id { get; set; }

        public int Pessoa_Id { get; set; }
    }
}
