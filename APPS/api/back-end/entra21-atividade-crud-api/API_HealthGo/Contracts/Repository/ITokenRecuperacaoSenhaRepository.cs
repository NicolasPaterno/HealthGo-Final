using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface ITokenRecuperacaoSenhaRepository
    {
        public Task SaveAsync(TokenRecuperacaoSenhaEntity token);

        public Task<TokenRecuperacaoSenhaEntity?> GetByTokenAsync(string token);

        public Task MarkAsUsedAsync(string token);

    }
}