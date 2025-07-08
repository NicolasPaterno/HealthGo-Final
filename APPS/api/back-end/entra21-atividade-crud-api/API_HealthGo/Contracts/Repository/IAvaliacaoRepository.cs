using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
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
