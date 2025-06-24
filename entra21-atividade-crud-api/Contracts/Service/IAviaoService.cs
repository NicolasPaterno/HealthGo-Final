using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response.Especialidade;
using MinhaPrimeiraApi.Response;

namespace MinhaPrimeiraApi.Contracts.Service
{
    public interface IAviaoService
    {
        Task<MessageResponse> Delete(int id);
        Task<MessageResponse> Post(AviaoInsertDTO aviao);
        Task<MessageResponse> Update(AviaoEntity aviao);
        Task<AviaoGetAllResponse> GetAll();
        Task<AviaoEntity> GetById(int id);
    }
}
