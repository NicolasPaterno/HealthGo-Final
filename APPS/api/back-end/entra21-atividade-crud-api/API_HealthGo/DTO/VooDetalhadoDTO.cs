namespace API_HealthGo.DTO
{
    public class VooDetalhadoDTO
    {
        public string Origem { get; set; }
        public string Destino { get; set; }
        public string NomeAeroportoOrigem { get; set; }
        public string NomeAeroportoDestino { get; set; }
        public string CidadeOrigem { get; set; }
        public string CidadeDestino { get; set; }
        public string NumeroVoo { get; set; }
        public string TipoAssento { get; set; }
        public decimal Preco { get; set; }
        public string Companhia { get; set; }
        public DateTime DataPartida { get; set; }
        public DateTime DataChegada { get; set; }
    }
}
