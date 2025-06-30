namespace entra21_atividade_crud_api.Entity
{
    public class AeroportoEntity
    {
        public int id { get; set; }

        public string Nome { get; set; }

        public string CodigoIata { get; set; }

        public int Cidade_id { get; set; }
    }
}