namespace API_HealthGo.DTO
{
    public class PrestadorServicoAgendaDTO
    {
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public string Funcao { get; set; }
        public string NomeCliente { get; set; }
        public string EmailCliente { get; set; }
        public string TelefoneCliente { get; set; }
        public decimal PrecoTotal { get; set; }
    }
}
