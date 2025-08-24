namespace API_HealthGo.Entities
{
    public class PrestadorServicoEspecialidadeEntity
    {
        public int Id { get; set; }
        public int PrestadorServicoId { get; set; }
        public int EspecialidadeId { get; set; }
        public decimal PrecoHora { get; set; }
    }
}
