using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace atividade_bd_csharp.DTO
{
    public class QuartoInsertDTO
    {
        public string Numero { get; set; }
        public string Andar { get; set; }
        public bool AceitaAnimal { get; set; }
        public string Obs { get; set; }
        public decimal Preco { get; set; }
        public string Endereco { get; set; }
        public int LimitePessoas { get; set; }
    }
}
