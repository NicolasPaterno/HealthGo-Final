using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IPrestadorServicoService
    {
        Task<PrestadorServicoGetAllResponse> GetAll();

        Task<PrestadorServicoEntity> GetById(int id);

        Task<MessageResponse> Post(PrestadorServicoInsertDTO prestadorServico);

        Task<MessageResponse> Update(PrestadorServicoEntity prestadorServico);

        Task<MessageResponse> Delete(int id);
    }
}
