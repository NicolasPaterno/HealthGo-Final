using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface ITokenService
    {
        string GenerateToken(PessoaEntity pessoa);
    }
}