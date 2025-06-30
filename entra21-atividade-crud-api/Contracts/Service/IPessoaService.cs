using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
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