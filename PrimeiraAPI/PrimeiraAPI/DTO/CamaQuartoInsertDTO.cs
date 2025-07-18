using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace atividade_bd_csharp.DTO
{
    public class CamaQuartoInsertDTO
    {
        public int Quantidade { get; set; }
        public StatusCamaDTO TipoCama { get; set; } 
        public int QuartoId { get; set; }

        public enum StatusCamaDTO 
        {
            Solteiro, 
            Casal,
            Beliche,
            Futon
        }

    }
}
