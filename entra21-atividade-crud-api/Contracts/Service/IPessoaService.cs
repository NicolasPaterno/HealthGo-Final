using APIHealthGo.Response;
using atividade_bd_csharp.Entity;
using MyFirstCRUD.DTO;

namespace APIHealthGo.Contracts.Service
{
    public interface IPessoaService
    {
        Task<PessoaGetAllResponse> GetAllPessoa();
        Task<PessoaEntity> GetPessoaById(int id);
        Task<MessageResponse> Post(PessoaInsertDTO pessoa);
        Task<MessageResponse> Delete(int id);
        Task<MessageResponse> Update(PessoaEntity pessoa);
    }
}
