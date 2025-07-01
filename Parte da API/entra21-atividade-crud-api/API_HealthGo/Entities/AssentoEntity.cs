using System;
using System.Collections.Generic;
using System.Linq;
namespace API_HealthGo.Entity
{
    public class AssentoEntity
    {
        public int Id { get; set; }
        
        public string Numero { get; set; }
        
        public string Tipo { get; set; } // ENUM('Economico', 'Executivo', 'Primeira Classe')

        public double Preco { get; set; }

        public int Aviao_Id { get; set; }
    }
}
