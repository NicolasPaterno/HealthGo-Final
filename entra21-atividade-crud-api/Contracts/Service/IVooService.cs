using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;
using API_HealthGo.Response.VooResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IVooService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(VooInsertDTO voo);

        Task<MessageResponse> Update(VooEntity voo);

        Task<VooGetAllResponse> GetAll();

        Task<VooEntity> GetById(int id);
    }
}