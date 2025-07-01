using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface INacaoRepository
    {
        Task<IEnumerable<NacaoEntity>> GetAll();

        Task<NacaoEntity> GetById(int id);

        Task Insert(NacaoInsertDTO nacao);

        Task Delete(int id);

        Task Update(NacaoEntity nacao);
    }
}