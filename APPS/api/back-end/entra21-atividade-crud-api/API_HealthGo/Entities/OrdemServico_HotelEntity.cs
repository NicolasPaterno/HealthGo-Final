namespace API_HealthGo.Entities
{
    public class OrdemServico_HotelEntity
    {
        public int Id { get; set; }

        public DateTime DataEntrada { get; set; }

        public DateTime DataSaida { get; set; }

        public int Hotel_Id { get; set; }

        public int OrdemServico_Id { get; set; }
    }
}
