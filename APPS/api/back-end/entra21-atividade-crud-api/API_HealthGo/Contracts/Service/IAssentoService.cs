using API_HealthGo.Response;
using API_HealthGo.Entities;
using API_HealthGo.DTO;

namespace API_HealthGo.Contracts.Service
{
    public interface IAssentoService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(AssentoInsertDTO assento);

        Task<MessageResponse> Update(AssentoEntity assento);

        Task<AssentoGetAllResponse> GetAll();

        Task<AssentoEntity> GetById(int id);
    }
}