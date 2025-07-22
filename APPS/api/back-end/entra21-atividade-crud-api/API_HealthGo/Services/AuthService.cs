using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Services
{
    public class AuthService : IAuthService
    {
        private IPessoaRepository _pessoaRepository;
        private ITokenRecuperacaoSenhaRepository _tokenRecuperacaoSenhaRepository;
        private IEmailService _emailService;

        public AuthService(IPessoaRepository pessoaRepository, ITokenRecuperacaoSenhaRepository tokenRecuperacaoSenhaRepository, IEmailService emailService)
        {
            _pessoaRepository = pessoaRepository;
            _tokenRecuperacaoSenhaRepository = tokenRecuperacaoSenhaRepository;
            _emailService = emailService;
        }

        public async Task SolicitarRecuperacaoSenhaAsync(string email)
        {
            // 1. Verifica se a pessoa existe
            var pessoa = await _pessoaRepository.GetPessoaByEmail(email);
            if (pessoa == null)
                throw new Exception("Email não encontrado.");

            // 2. Gera token
            var token = new TokenRecuperacaoSenhaEntity
            {
                Token = Guid.NewGuid().ToString("N"),
                Pessoa_Id = pessoa.Id
            };

            // 3. Salva no banco || NÃO PRECISA MAIS?, APENAS LOCALMENTE NA API É SUFICIENTE, MAS TERIA QUE SER IMPLEMENTADO
            //UM EXTRAIDOR DE TOKEN, PEGAR O PESSOA_ID E TEMPO DE EXPIRAÇÃO, PARA A VERIFICAÇÃO DE AMBOS
            //E ATUALIZAR COM O UPDATE 
            //ISSO SERIA APENAS FEITO POSTERIORMENTE, SE SOBRAR TEMPO, POIS É UM EXTRA, NÃO É O FOCO PRINCIPAL DO PROJETO

            await _tokenRecuperacaoSenhaRepository.SaveAsync(token);

            // 4. Aqui você pode chamar um serviço de e-mail
            string link = $"http://localhost:5173/redefinir-senha/{token.Token}";

            string corpo = $@"
                <p>Olá {pessoa.Nome}!</p>
                <p>Use o código abaixo para redefinir sua senha. Você tem 15 minutos para redefinir sua senha.</p>

                <p><a href='{link}'>Clique aqui para redefinir sua senha</a></p> 
                <p>Se você não fez essa solicitação, ignore este e-mail, e nunca compartilhe para ninguém este link.</p>
            ";

            await _emailService.EnviarEmailAsync(pessoa.Email, "Redefinição de Senha - HealthGo", corpo);
        }

        public async Task RedefinirSenhaAsync(RedefinirSenhaDTO dto)
        {
            ValidarSenha(dto.NovaSenha);

            // 1. Buscar o token no banco
            var tokenEntity = await _tokenRecuperacaoSenhaRepository.GetByTokenAsync(dto.Token);

            // 2. Buscar a pessoa
            var pessoa = await _pessoaRepository.GetPessoaById(tokenEntity.Pessoa_Id);

            if (pessoa == null)
                throw new Exception("Pessoa associada ao token não encontrada.");

            // 3. Hash da nova senha
            var novaSenhaCriptografada = BCrypt.Net.BCrypt.HashPassword(dto.NovaSenha);

            // 4. Atualizar a senha da pessoa
            await _pessoaRepository.AtualizarSenhaAsync(pessoa.Id, novaSenhaCriptografada);

            // 5. Deletar o token no Banco de Dados
            await _tokenRecuperacaoSenhaRepository.DeleteToken(dto.Token);
        }

        private void ValidarSenha(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
            {
                throw new ArgumentException("A senha deve ter no mínimo 8 caracteres.");
            }

            if (!password.Any(char.IsUpper))
            {
                throw new ArgumentException("A senha deve conter pelo menos uma letra maiúscula.");
            }

            // Verify if the password contains at least one lowercase letter
            if (!password.Any(c => !char.IsLetterOrDigit(c)))
            {
                throw new ArgumentException("A senha deve conter pelo menos um caractere especial (ex: !@#$&*).");
            }
        }
    }
}
