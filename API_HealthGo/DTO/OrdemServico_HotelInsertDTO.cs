namespace API_HealthGo.DTO
{
    public class OrdemServico_HotelInsertDTO
    {
        public decimal Preco { get; set; }

        public string Observacao { get; set; }

        public int QuantAcompanhante { get; set; }

        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public int Quarto_Id { get; set; }

        public int OrdemServico_Id { get; set; }
    }
}
