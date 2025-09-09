using API_HealthGo.Responses;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IPassagemService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(PassagemInsertDTO passagem);

        Task<MessageResponse> Update(PassagemEntity passagem);

        Task<PassagemGetAllResponse> GetAll();

        Task<PassagemEntity> GetById(int id);
    }
}