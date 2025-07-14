using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IAeroportoService
    {
        Task<MessageResponse> Delete(int id);

        Task<AeroportoGetAllResponse> Get(int? cidade_Id);

        Task<AeroportoEntity> GetById(int id);

        Task<MessageResponse> Post(AeroportoInsertDTO aeroporto);

        Task<MessageResponse> Update(AeroportoEntity aeroporto);
    }
}