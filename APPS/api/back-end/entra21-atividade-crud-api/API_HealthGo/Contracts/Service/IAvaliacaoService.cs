using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IAvaliacaoService
    {
        Task<AvaliacaoGetAllResponse> GetAll();

        Task<AvaliacaoEntity> GetById(int id);

        Task<MessageResponse> Post(AvaliacaoInsertDTO avaliacao);

        Task<MessageResponse> Update(AvaliacaoEntity avaliacao);

        Task<MessageResponse> Delete(int id);
    }
}
