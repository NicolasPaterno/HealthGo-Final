namespace API_HealthGo.Entities
{
    public class LembreteEntity
    {
        public int Id { get; set; }
        
        public string Titulo { get; set; }
        
        public DateTime Data { get; set; }

        public string Tipo { get; set; } // ENUM('Remédio', 'Consulta', 'Outro')

        public int Pessoa_Id { get; set; }
    }
}
