namespace API_HealthGo.DTO
{
    public class AvaliacaoInsertDTO
    {
        public int Nota { get; set; }

        public string Comentario { get; set; }

        public string DataAvaliacao { get; set; }

        public int Pessoa_Id { get; set; }

        public int Hotel_Id { get; set; }

        public int PrestadorServico_Id { get; set; }
    }
}
