using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IPrestadorServicoService
    {
        Task<MessageResponse> Delete(int id);

        Task<PrestadorServicoGetAllResponse> GetAll();

        Task<PrestadorServicoEntity> GetById(int id);

        Task<MessageResponse> Post(PrestadorServicoInsertDTO prestadorServico);

        Task<MessageResponse> Update(PrestadorServicoEntity prestadorServico);     
    }
}
