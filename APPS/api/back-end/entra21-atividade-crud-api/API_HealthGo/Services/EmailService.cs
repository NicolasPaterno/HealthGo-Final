using API_HealthGo.Contracts.Service;
using System.Net;
using System.Net.Mail;

namespace API_HealthGo.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task EnviarEmailAsync(string destinatario, string assunto, string corpoHtml)
        {
            var remetente = _config["Email:Remetente"];
            var senha = _config["Email:Senha"];

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(remetente, senha),
                EnableSsl = true
            };

            var mensagem = new MailMessage
            {
                From = new MailAddress(remetente),
                Subject = assunto,
                Body = corpoHtml,
                IsBodyHtml = true
            };

            mensagem.To.Add(destinatario);

            await smtp.SendMailAsync(mensagem);
        }
    }
}
