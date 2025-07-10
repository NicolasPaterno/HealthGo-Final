namespace API_HealthGo.Entities
{
    public class AviaoEntity
    {
        public int Id { get; set; }
       
        public int QuantidadeVaga { get; set; }
        
        public string CodigoRegistro { get; set; }
        
        public string Companhia { get; set; }
        
        public string Modelo { get; set; }
        
        public string Fabricante { get; set; }
    }
}
