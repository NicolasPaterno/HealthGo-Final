using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PrimeiraAPI.Response.Quarto;

namespace atividade_bd_csharp.Entity
{
    public class QuartoEntity
    {
        public int Id { get; set; }  
        public string Numero { get; set; }
        public string Andar { get; set; }
        public bool AceitaAnimal { get; set; }
        public string Observacao { get; set; }
        public decimal Preco { get; set; }
        public string EnderecoFoto { get; set; }
        public int LimitePessoa { get; set; }
        public int Hotel_id { get; set; }
        public QuartoGetAllResponse Data { get; internal set; }
    }
}
