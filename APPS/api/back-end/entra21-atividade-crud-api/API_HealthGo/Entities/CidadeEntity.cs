namespace API_HealthGo.Entities
{
    public class CidadeEntity
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public int Estado_Id { get; set; }

        // Propriedades de navegação
        public virtual EstadoEntity Estado { get; set; }
    }
}