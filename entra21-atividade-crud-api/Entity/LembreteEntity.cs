namespace entra21_atividade_crud_api.Entity
{
    public enum Frequencia
    {
        Nenhum,
        Diario,
        Semanal,
        Mensal
    }

    public class LembreteEntity
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public int Pessoa_Id { get; set; }
    }
}
