using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IHotelService
    {
        Task<HotelGetAllResponse> GetAll();

        Task<HotelEntity> GetById(int id);

        Task<MessageResponse> Post(HotelInsertDTO hotel);

        Task<MessageResponse> Update(HotelEntity hotel);

        Task<MessageResponse> Delete(int id);
    }
}
