using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IVooService
    {
        Task<VooGetAllResponse> GetAll();

        Task<VooEntity> GetById(int id);

        Task<MessageResponse> Post(VooInsertDTO voo);

        Task<MessageResponse> Update(VooEntity voo);

        Task<MessageResponse> Delete(int id);
    }
}