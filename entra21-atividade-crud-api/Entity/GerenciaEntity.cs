namespace MyFirstCRUD.Entity
{
    public class GerenciaEntity
    {
        public int Id { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public int Pessoa_Id { get; set; }
        public int Hotel_Id { get; set; }
    }
}
