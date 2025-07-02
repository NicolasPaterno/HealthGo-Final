using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Service
{
    public interface ITokenService
    {
        string GenerateToken(PessoaEntity pessoa);
    }
}