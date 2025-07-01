namespace API_HealthGo.Entity
{
    public class Cama_QuartoEntity
    {
        public int Id { get; set; }

        public string Quantidade { get; set; }

        public string TipoCama { get; set; } // ENUM('Solteiro', 'Casal', 'Beliche', 'Futon') 

        public int Quarto_Id { get; set; }
    }
}
