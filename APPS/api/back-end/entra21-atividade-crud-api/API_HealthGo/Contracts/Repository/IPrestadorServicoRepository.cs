using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IPrestadorServicoRepository
    {
        Task<IEnumerable<PrestadorServicoEntity>> GetAll();

        Task<PrestadorServicoEntity> GetByPessoaId(int id);

        Task Insert(PrestadorServicoInsertDTO prestadorServico);

        Task Delete(int id);

        Task Update(PrestadorServicoEntity prestadorServico);
    }
}
