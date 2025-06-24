using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MinhaPrimeiraApi.Entity
{
    public class VooEntity
    {
        public int Id { get; set; }
        public string CodigoVoo { get; set; }
        public DateTime DataHoraPartida { get; set; }
        public DateTime DataHoraChegada { get; set; }
        public int Origem_Id { get; set; }
        public int Destino_Id { get; set; }
        public int Aviao_Id { get; set; }
    }
}
