namespace API_HealthGo.DTO
{
    public class PassagemInsertDTO
    {
        public decimal Preco { get; set; }

        public int Assento_Id { get; set; }

        public int Voo_Id { get; set; }

        public int OrdemServico_Id { get; set; }
    }
}
