using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface IOrdemServicoRepository
    {
        Task<IEnumerable<OrdemServicoEntity>> GetAll();

        Task<OrdemServicoEntity> GetById(int id);

        Task Insert(OrdemServicoInsertDTO ordemServico);

        Task Delete(int id);

        Task Update(OrdemServicoEntity ordemServico);
    }
}
