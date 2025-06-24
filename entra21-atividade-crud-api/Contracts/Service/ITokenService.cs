using atividade_bd_csharp.Entity;

namespace APIHealthGo.Contracts.Service
{
    public interface ITokenService
    {
        string GenerateToken(PessoaEntity pessoa);
    }
}
