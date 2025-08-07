using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IQuartoService
    {
        Task<QuartoGetAllResponse> GetAll();

        Task<QuartoEntity> GetById(int id);

        Task<QuartoGetAllResponse> GetByHotelId(int hotelId);

        Task<MessageResponse> Post(QuartoInsertDTO quarto);

        Task<MessageResponse> Update(QuartoEntity quarto);

        Task<MessageResponse> Delete(int id);
    }
}
