﻿namespace API_HealthGo.Entities
{
    public class QuartoEntity
    {
        public int Id { get; set; }

        public string Numero { get; set; }

        public int Andar { get; set; }

        public bool AceitaAnimal { get; set; }

        public string Observacao { get; set; }

        public decimal Preco { get; set; }

        public int LimitePessoa { get; set; }

        public int Hotel_Id { get; set; }
    }
}
