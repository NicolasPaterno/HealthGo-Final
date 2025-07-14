using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IPessoaRepository
    {
        Task<IEnumerable<PessoaEntity>> GetAllPessoa();

        Task<PessoaEntity> GetPessoaById(int id);

        Task InsertPessoa(PessoaInsertDTO pessoa);

        Task UpdatePessoa(PessoaEntity pessoa);

        Task DeletePessoa(int id);

        Task<PessoaEntity> GetPessoaByEmail(string email);

        Task AtualizarSenhaAsync(int pessoa_Id, string novaSenha);
    }
}