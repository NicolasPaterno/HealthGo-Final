using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IAviaoService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(AviaoInsertDTO aviao);

        Task<MessageResponse> Update(AviaoEntity aviao);

        Task<AviaoGetAllResponse> GetAll();

        Task<AviaoEntity> GetById(int id);
    }
}