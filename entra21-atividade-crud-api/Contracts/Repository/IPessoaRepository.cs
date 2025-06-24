using atividade_bd_csharp.Entity;
using MyFirstCRUD.DTO;

namespace MyFirstCRUD.Contracts.Repository
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