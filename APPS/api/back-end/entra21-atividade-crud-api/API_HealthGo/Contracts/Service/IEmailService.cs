namespace API_HealthGo.Contracts.Service
{
    public interface IEmailService
    {
        public Task EnviarEmailAsync(string destinatario, string assunto, string corpoHtml);
    }
}
