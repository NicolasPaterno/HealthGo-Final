using API_HealthGo.DTO;

namespace API_HealthGo.Contracts.Service
{
    public interface IAuthService
    {
        Task SolicitarRecuperacaoSenhaAsync(string email);

        Task RedefinirSenhaAsync(RedefinirSenhaDTO dto);
    }
}
