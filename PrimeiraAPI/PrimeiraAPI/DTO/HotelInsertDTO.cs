using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace atividade_bd_csharp.DTO
{
      public class HotelInsertDTO
      {
        public int Id { get; set; }
        public string Cnpj { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string EnderecoFoto { get; set; } = string.Empty;
        public string Site { get; set; } = string.Empty;
        public string Acessibilidade { get; set; } = string.Empty;
        public string Cep { get; set; } = string.Empty;
        public string Bairro { get; set; } = string.Empty;
        public string Rua { get; set; } = string.Empty;
        public string NumeroEndereco { get; set; } = string.Empty;
        public string Cidade_Id { get; set; } = string.Empty;
        public int Hotel_Id { get; set; }

        public StatusTipoDTO Tipo { get; set; }
        public enum StatusTipoDTO 
        {
            Hotel = 1,
            Apartamento = 2,
            Casa = 3,
            Hostel = 4,
            Pousada = 5
        }

      }
}
