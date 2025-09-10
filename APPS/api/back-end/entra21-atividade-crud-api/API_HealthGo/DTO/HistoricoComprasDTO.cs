namespace API_HealthGo.DTO
{
    public class HistoricoComprasDTO
    {
        public int OrdemServicoId { get; set; }
        public DateTime DataCriacao { get; set; }
        public string StatusOS { get; set; }
        public string FormaPagamento { get; set; }
        public string NomeHotel { get; set; }
        public decimal? PrecoQuarto { get; set; }
        public decimal? PrecoPrestador { get; set; }
        public string EspecialidadePrestador { get; set; }
        public decimal? PrecoVoo { get; set; }
        public string CompanhiaAerea { get; set; }
    }
}
