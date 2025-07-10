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

        public AuthService(IPessoaRepository pessoaRepository, ITokenRecuperacaoSenhaRepository tokenRecuperacaoSenhaRepository)
        {
            _pessoaRepository = pessoaRepository;
            _tokenRecuperacaoSenhaRepository = tokenRecuperacaoSenhaRepository;
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

            // 3. Salva no banco
            await _tokenRecuperacaoSenhaRepository.SaveAsync(token);

            // 4. Aqui você pode chamar um serviço de e-mail
            // Ex: await _emailService.SendPasswordResetEmail(email, token.Token);

            // Por enquanto, pode só fazer um log:
            Console.WriteLine($"Link de recuperação: http://localhost:3000/redefinir-senha?token={token.Token}");
        }

        public async Task RedefinirSenhaAsync(RedefinirSenhaDTO dto)
        {
            // 1. Buscar o token no banco
            var tokenEntity = await _tokenRecuperacaoSenhaRepository.GetByTokenAsync(dto.Token);

            if (tokenEntity == null)
                throw new Exception("Token inválido, expirado ou já utilizado.");

            // 2. Buscar a pessoa
            var pessoa = await _pessoaRepository.GetPessoaByIdAsync(tokenEntity.Pessoa_Id);

            if (pessoa == null)
                throw new Exception("Pessoa associada ao token não encontrada.");

            // 3. Hash da nova senha
            var novaSenhaCriptografada = BCrypt.Net.BCrypt.HashPassword(dto.NovaSenha);

            // 4. Atualizar a senha da pessoa
            await _pessoaRepository.AtualizarSenhaAsync(pessoa.Id, novaSenhaCriptografada);

            // 5. Marcar token como usado
            await _tokenRecuperacaoSenhaRepository.MarkAsUsedAsync(dto.Token);
        }
    }
}
