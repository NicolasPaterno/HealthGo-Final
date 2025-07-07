using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface IPrestadorServicoRepository
    {
        Task<IEnumerable<PrestadorServicoEntity>> GetAll();

        Task<PrestadorServicoEntity> GetById(int id);

        Task Insert(PrestadorServicoInsertDTO prestadorServico);

        Task Delete(int id);

        Task Update(PrestadorServicoEntity prestadorServico);
    }
}
