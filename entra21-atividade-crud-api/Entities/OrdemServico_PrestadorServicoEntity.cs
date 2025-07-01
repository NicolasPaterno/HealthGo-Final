namespace API_HealthGo.Entity
{
    public class OrdemServico_PrestadorServicoEntity
    {
        public decimal Preco { get; set; }

        public int HorasTrabalhadas { get; set; }

        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public string StatusOs { get; set; } // ENUM('Concluído', 'Em andamento', 'Cancelado')

        public int PrestadorServico_Id { get; set; }

        public int OrdemServico_Id { get; set; }
    }
}
