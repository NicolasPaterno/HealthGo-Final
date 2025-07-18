using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static atividade_bd_csharp.Entity.HotelEntity;

namespace atividade_bd_csharp.DTO
{
      public class HotelInsertDTO
      {
        public int Id { get; set; }
        public string Cnpj { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string EnderecoFoto { get; set; }
        public string Site { get; set; }
        public string Acessibilidade { get; set; }
        public string Cep { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string NumeroEndereco { get; set; }
        public string Cidade_Id { get; set; }
        public int Hotel_Id { get; set; }

        public StatusTipo Tipo { get; set; }
        public enum StatusTipo 
        {
            Hotel = 1,
            Apartamento = 2,
            Casa = 3,
            Hostel = 4,
            Pousada = 5
        }

      }
}
