using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IOrdemServico_PrestadorServicoService
    {
        Task<OrdemServico_PrestadorServicoGetAllResponse> GetAll();

        Task<OrdemServico_PrestadorServicoEntity> GetById(int id);

        Task<MessageResponse> Post(OrdemServico_PrestadorServicoInsertDTO ordemServico_PrestadorServico);

        Task<MessageResponse> Update(OrdemServico_PrestadorServicoEntity ordemServico_PrestadorServico);

        Task<MessageResponse> Delete(int id);
    }
}
