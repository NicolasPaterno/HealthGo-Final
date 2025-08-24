namespace API_HealthGo.Entities
{
    public class PassagemEntity
    {
        public int Id { get; set; }
        
        public decimal Preco { get; set; }
        
        public string Classe { get; set; }
        
        public int Voo_Id { get; set; }
        
        public int Pessoa_Id { get; set; }
    }
}
