namespace API_HealthGo.Entities
{
    public class VooEntity
    {
        public int Id { get; set; }
        
        public string Numero { get; set; }
        
        public DateTime DataPartida { get; set; }
        
        public DateTime DataChegada { get; set; }
        
        public int AeroportoOrigem_Id { get; set; }
        
        public int AeroportoDestino_Id { get; set; }
        
        public int Aviao_Id { get; set; }
    }
}
