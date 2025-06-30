namespace entra21_atividade_crud_api.Entity
{
    public class EstadoEntity
    {
        public int id { get; set; }

        public string Nome { get; set; }

        public string Sigla { get; set; }

        public int Nacao_id { get; set; }
    }
}