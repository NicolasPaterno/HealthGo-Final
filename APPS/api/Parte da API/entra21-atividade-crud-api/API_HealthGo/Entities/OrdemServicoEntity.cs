﻿namespace API_HealthGo.Entity
{
    public class OrdemServicoEntity
    {
        public int Id { get; set; }

        public DateTime DataCriacao { get; set; }

        public string StatusOS { get; set; } // ENUM('Concluído', 'Em andamento', 'Cancelado')

        public int Pessoa_Id { get; set; }
    }
}
