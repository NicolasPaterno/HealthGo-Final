using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IAvaliacaoRepository
    {
        Task<IEnumerable<AvaliacaoEntity>> GetAll();

        Task<AvaliacaoEntity> GetById(int id);

        Task Insert(AvaliacaoInsertDTO avaliacao);

        Task Delete(int id);

        Task Update(AvaliacaoEntity avaliacao);
    }
}
