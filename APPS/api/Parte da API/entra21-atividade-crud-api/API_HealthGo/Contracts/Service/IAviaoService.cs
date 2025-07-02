using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

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