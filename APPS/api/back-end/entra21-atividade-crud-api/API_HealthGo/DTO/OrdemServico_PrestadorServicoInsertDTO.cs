namespace API_HealthGo.DTO
{
    public class OrdemServico_PrestadorServicoInsertDTO
    {
        public decimal Preco { get; set; }

        public int HorasTrabalhadas { get; set; }

        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public string StatusOs { get; set; } // ENUM('Concluído', 'Em andamento', 'Cancelado')

        public int OrdemServico_Id { get; set; }

        public int PrestadorServico_Especialidade_PrestadorServico_Id { get; set; }

        public int PrestadorServico_Especialidade_Especialidade_Id { get; set; }
    }
}
