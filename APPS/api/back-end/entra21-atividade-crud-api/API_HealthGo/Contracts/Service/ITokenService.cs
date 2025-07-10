using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Service
{
    public interface ITokenService
    {
        string GenerateToken(PessoaEntity pessoa);
    }
}