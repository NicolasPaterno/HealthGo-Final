using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response.Especialidade;
using MinhaPrimeiraApi.Response;

namespace MinhaPrimeiraApi.Contracts.Service
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
