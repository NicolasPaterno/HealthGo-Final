using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;
using API_HealthGo.Response.Aeroporto;

namespace API_HealthGo.Contracts.Service
{
    public interface IAeroportoService
    {
        Task<MessageResponse> Delete(int id);

        Task<AeroportoGetAllResponse> Get(int? cidade_Id);

        Task<AeroportoEntity> GetById(int id);

        Task<MessageResponse> Post(AeroportoDTO aeroporto);

        Task<MessageResponse> Update(AeroportoEntity aeroporto);
    }
}