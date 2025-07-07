using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IPessoaService
    {
        Task<PessoaGetAllResponse> GetAll();

        Task<PessoaEntity> GetById(int id);

        Task<MessageResponse> Post(PessoaInsertDTO pessoa);

        Task<MessageResponse> Update(PessoaEntity pessoa);

        Task<MessageResponse> Delete(int id);
    }
}