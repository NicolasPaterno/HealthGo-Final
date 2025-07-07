using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface ICamaQuartoService
    {
        Task<CamaQuartoGetAllResponse> GetAll();

        Task<CamaQuartoEntity> GetById(int id);

        Task<MessageResponse> Post(CamaQuartoInsertDTO camaQuarto);

        Task<MessageResponse> Update(CamaQuartoEntity camaQuarto);

        Task<MessageResponse> Delete(int id);
    }
}
