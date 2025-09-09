namespace API_HealthGo.Entities
{
    public class PrestadorServicoEspecialidadeEntity
    {
        public int Id { get; set; }
        public int PrestadorServico_Id { get; set; }
        public int Especialidade_Id { get; set; }
        public decimal PrecoHora { get; set; }
    }
}
