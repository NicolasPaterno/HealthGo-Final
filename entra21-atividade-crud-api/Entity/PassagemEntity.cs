using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API_HealthGo.Entity
{
    public class PassagemEntity
    {
        public int Id { get; set; }
        
        public decimal Preco { get; set; }
        
        public int Assento_Id { get; set; }
        
        public int Voo_Id { get; set; }
        
        public int OrdemServico_id { get; set; }
    }
}
