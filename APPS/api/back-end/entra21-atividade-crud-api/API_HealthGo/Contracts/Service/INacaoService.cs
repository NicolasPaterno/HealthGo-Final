using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

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