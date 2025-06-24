using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MinhaPrimeiraApi.Entity
{
    public class PassagemEntity
    {
        public int Id {  get; set; }
        public decimal Preco {  get; set; }
        public int Assento_Id {  get; set; }
        public int Voo_ID { get; set; }
        public int OrdemServico_Id { get; set; }
    }
}
