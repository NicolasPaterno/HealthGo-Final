// DTO que será enviado para o seu front-end
namespace API_HealthGo.DTO
{
    public class HospitalDTO
    {
        public string COMP { get; set; }
        public string Nome { get; set; }
        public string RazaoSocial { get; set; }
        public string NaturezaJuridica { get; set; }
        public string TipoUnidade { get; set; }
        public string Uf { get; set; }
        public string Municipio { get; set; }
        public string Bairro { get; set; }
        public string Logradouro { get; set; }
        public string NumeroEndereco { get; set; }
        public string Cep { get; set; }
        public string Numero { get; set; }
    }
}