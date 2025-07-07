using API_HealthGo.Response;
using API_HealthGo.Entity;
using API_HealthGo.DTO;

namespace API_HealthGo.Contracts.Service
{
    public interface IAssentoService
    {
        Task<AssentoGetAllResponse> GetAll();

        Task<AssentoEntity> GetById(int id);

        Task<MessageResponse> Post(AssentoInsertDTO assento);

        Task<MessageResponse> Update(AssentoEntity assento);

        Task<MessageResponse> Delete(int id);
    }
}