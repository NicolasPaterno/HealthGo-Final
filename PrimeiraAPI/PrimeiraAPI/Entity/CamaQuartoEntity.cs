using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace atividade_bd_csharp.Entity
{
    public enum StatusCamaEntity
    {
        Solteiro = 1,
        Casal = 2,
        Beliche = 3,
        Futon = 4
    }
    public class CamaQuartoEntity
    {
        public int Id { get; set; }
        public int Quantidade { get; set; }
        public StatusCamaEntity TipoCama { get; set; }
        public int QuartoId { get; set; }
    }
}
