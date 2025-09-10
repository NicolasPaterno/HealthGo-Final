using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IOrdemServicoRepository
    {
        Task<IEnumerable<OrdemServicoEntity>> GetAll();

        Task<OrdemServicoEntity> GetById(int id);

        Task Insert(OrdemServicoInsertDTO ordemServico);

        Task Delete(int id);

        Task Update(OrdemServicoEntity ordemServico);

        Task<int> GetLatestByPessoaId(int pessoaId);

        Task<IEnumerable<HistoricoComprasDTO>> GetHistoricoComprasByPessoaId(int pessoaId);
    }
}
