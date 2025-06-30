using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface IPessoaRepository
    {
        Task<IEnumerable<PessoaEntity>> GetAllPessoa();

        Task<PessoaEntity> GetPessoaById(int id);

        Task InsertPessoa(PessoaInsertDTO pessoa);

        Task UpdatePessoa(PessoaEntity pessoa);

        Task DeletePessoa(int id);

        Task<PessoaEntity> GetPessoaByEmail(string email);
    }
}