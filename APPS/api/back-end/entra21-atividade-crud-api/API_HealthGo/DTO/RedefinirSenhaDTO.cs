namespace API_HealthGo.DTO
{
    public class RedefinirSenhaDTO // usado na redefinição de senha por meio de email
    {
        public string Token { get; set; } = string.Empty;

        public string NovaSenha { get; set; } = string.Empty;
    }
}
