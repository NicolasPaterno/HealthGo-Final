using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Org.BouncyCastle.Asn1.Mozilla;

namespace MinhaPrimeiraApi.Entity
{
    public class AviaoEntity
    {
        public int Id { get; set; }
        public int QuantidadeVaga { get; set; }
        public string CodigoRegistro {  get; set; }
        public string Companhia {  get; set; }
        public string Modelo { get; set; }
        public string Fabricante { get; set; }
    }
}
