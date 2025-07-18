using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static atividade_bd_csharp.Entity.CamaQuartoEntity;

namespace atividade_bd_csharp.DTO
{
    class CamaQuartoInsertDTO
    {
        public int Quantidade { get; set; }
        public StatusCama TipoCama { get; set; }
    }
}
