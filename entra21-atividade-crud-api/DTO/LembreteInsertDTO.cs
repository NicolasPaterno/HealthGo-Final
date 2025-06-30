using MyFirstCRUD.Entity;
using System;

namespace entra21_atividade_crud_api.DTO
{
    public class LembreteInsertDTO
    {
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public int Pessoa_Id { get; set; }
    }
}
