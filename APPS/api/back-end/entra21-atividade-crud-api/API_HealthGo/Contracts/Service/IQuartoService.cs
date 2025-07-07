using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IQuartoService
    {
        Task<QuartoGetAllResponse> GetAll();

        Task<QuartoEntity> GetById(int id);

        Task<MessageResponse> Post(QuartoInsertDTO quarto);

        Task<MessageResponse> Update(QuartoEntity quarto);

        Task<MessageResponse> Delete(int id);
    }
}
