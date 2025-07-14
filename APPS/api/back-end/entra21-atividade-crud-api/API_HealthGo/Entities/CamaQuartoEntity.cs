namespace API_HealthGo.Entities
{
    public class CamaQuartoEntity
    {
        public int Id { get; set; }

        public string Quantidade { get; set; }

        public string TipoCama { get; set; } // ENUM('Solteiro', 'Casal', 'Beliche', 'Futon') 

        public int Quarto_Id { get; set; }
    }
}
