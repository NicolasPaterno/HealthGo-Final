using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repository
{
    public interface IOrdemServico_PrestadorServicoRepository
    {
        Task<IEnumerable<OrdemServico_PrestadorServicoEntity>> GetAll();

        Task<OrdemServico_PrestadorServicoEntity> GetById(int id);

        Task Insert(OrdemServico_PrestadorServicoInsertDTO ordemServico_PrestadorServico);

        Task Delete(int id);

        Task Update(OrdemServico_PrestadorServicoEntity ordemServico_PrestadorServico);
    }
}