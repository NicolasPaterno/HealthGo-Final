using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IOrdemServicoService
    {
        Task<OrdemServicoGetAllResponse> GetAll();

        Task<OrdemServicoEntity> GetById(int id);

        Task<MessageResponse> Post(OrdemServicoInsertDTO ordemServico);

        Task<MessageResponse> Update(OrdemServicoEntity ordemServico);

        Task<MessageResponse> Delete(int id);
    }
}
