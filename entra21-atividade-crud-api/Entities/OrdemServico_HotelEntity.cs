namespace API_HealthGo.Entity
{
    public class OrdemServico_HotelEntity
    {
        public string StatusOS { get; set; } // tipo ENUM deixa em string ou em método à parte?
                                             // ENUM('Concluído', 'Em andamento', 'Cancelado')

        public decimal Preco { get; set; }

        public string Observacao { get; set; }

        public int QuantAcompanhante { get; set; }

        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public int Quarto_Id { get; set; }

        public int OrdemServico_Id { get; set; }
    }
}
