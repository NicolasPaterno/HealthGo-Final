
namespace API_HealthGo.Entities
{
    public class TokenRecuperacaoSenhaEntity
    {
        public int Id { get; set; }

        public int Pessoa_Id { get; set; } // Relacionamento via ID

        public string Token { get; set; } = string.Empty;

        public DateTime DataExpiracao { get; set; }

        public TokenRecuperacaoSenhaEntity()
        {
            DataExpiracao = DateTime.UtcNow.AddMinutes(15);
        }
    }
}