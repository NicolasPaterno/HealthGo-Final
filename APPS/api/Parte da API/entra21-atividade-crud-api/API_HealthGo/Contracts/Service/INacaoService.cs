using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
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