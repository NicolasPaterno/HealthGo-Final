namespace API_HealthGo.Entities
{
    public class OrdemServico_PrestadorServicoEntity
    {
        public int Id { get; set; }

        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public int OrdemServico_Id { get; set; }

        public int PrestadorServico_Especialidade_Id { get; set; }
    }
}