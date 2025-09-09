namespace API_HealthGo.DTO
{
    public class OrdemServico_PrestadorServicoInsertDTO
    {
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public int OrdemServico_Id { get; set; }
        public int PrestadorServico_Especialidade_Id { get; set; }
    }
}
