using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IHotelService
    {
        Task<AviaoGetAllResponse> GetAll();

        Task<AviaoEntity> GetById(int id);

        Task<MessageResponse> Post(AviaoInsertDTO aviao);

        Task<MessageResponse> Update(AviaoEntity aviao);

        Task<MessageResponse> Delete(int id);
    }
}
