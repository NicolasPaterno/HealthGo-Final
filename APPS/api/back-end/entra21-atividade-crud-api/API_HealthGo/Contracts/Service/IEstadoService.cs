using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IEstadoService
    {
        Task<MessageResponse> Delete(int id);

        Task<EstadoGetAllResponse> GetAll();

        Task<EstadoEntity> GetById(int id);

        Task<MessageResponse> Post(EstadoInsertDTO estado);

        Task<MessageResponse> Update(EstadoEntity estado);
    }
}