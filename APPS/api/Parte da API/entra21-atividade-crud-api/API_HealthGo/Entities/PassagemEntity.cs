﻿namespace API_HealthGo.Entity
{
    public class PassagemEntity
    {
        public int Id { get; set; }
        
        public decimal Preco { get; set; }
        
        public int Assento_Id { get; set; }
        
        public int Voo_Id { get; set; }
        
        public int OrdemServico_Id { get; set; }
    }
}
