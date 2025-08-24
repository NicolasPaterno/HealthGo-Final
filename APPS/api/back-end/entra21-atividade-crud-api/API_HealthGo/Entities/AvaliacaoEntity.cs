namespace API_HealthGo.Entities
{
    public class AvaliacaoEntity
    {
        public int Id { get; set; }

        public int Nota { get; set; }

        public string Comentario { get; set; }

        public string DataAvaliacao { get; set; }

        public int Pessoa_Id { get; set; }

        public int Hotel_Id { get; set; }

        public int PrestadorServico_Id { get; set; }
    }
}
