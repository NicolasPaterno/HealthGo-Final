﻿namespace API_HealthGo.DTO
{
    public class VooInsertDTO
    {
        public string CodigoVoo { get; set; }

        public DateTime DataHoraPartida { get; set; }

        public DateTime DataHoraChegada { get; set; }

        public int Origem_Id { get; set; }

        public int Destino_Id { get; set; }

        public int Aviao_Id { get; set; }
    }
}
