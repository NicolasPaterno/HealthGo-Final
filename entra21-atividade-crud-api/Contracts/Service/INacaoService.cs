using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Nacao;

namespace MinhaPrimeiraApi.Contracts.Services
{
    public interface INacaoService
    {
        Task<MessageResponse> Delete(int id);

        Task<NacaoGetAllResponse> GetAll();

        Task<NacaoEntity> GetById(int id);

        Task<MessageResponse> Post(NacaoInsertDTO nacao);

        Task<MessageResponse> Update(NacaoEntity nacao);
    }
}