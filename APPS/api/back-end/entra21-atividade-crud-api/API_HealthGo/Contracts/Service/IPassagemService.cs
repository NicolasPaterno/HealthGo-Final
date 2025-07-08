using API_HealthGo.Response;
using API_HealthGo.Entity;
using API_HealthGo.DTO;

namespace API_HealthGo.Contracts.Service
{
    public interface IPassagemService
    {
        Task<PassagemGetAllResponse> GetAll();

        Task<PassagemEntity> GetById(int id);

        Task<MessageResponse> Post(PassagemInsertDTO passagem);

        Task<MessageResponse> Update(PassagemEntity passagem);

        Task<MessageResponse> Delete(int id);
    }
}