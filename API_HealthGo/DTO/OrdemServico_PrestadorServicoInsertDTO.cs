namespace API_HealthGo.DTO
{
    public class OrdemServico_PrestadorServicoInsertDTO
    {
        public int HorasTrabalhadas { get; set; }

        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public string StatusOs { get; set; }

        public int PrestadorServico_Id { get; set; }

        public int OrdemServico_Id { get; set; }
    }
}
