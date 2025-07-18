using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace atividade_bd_csharp.Entity
{
    public class CamaQuartoEntity
    {
        public int Id { get; set; }
        public int Quantidade { get; set; }
        public EnumCama TipoCama { get; set; }
        public int QuartoId { get; set; }

        public enum EnumCama
        {
            Solteiro = 1,
            Casal = 2,
            Beliche = 3,
            Futon = 4
        }
    }
}
