using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repository
{
    public interface IAviaoRepository
    {
        Task<IEnumerable<AviaoEntity>> GetAll();

        Task<AviaoEntity> GetById(int id);

        Task Insert(AviaoInsertDTO aviao);

        Task Delete(int id);

        Task Update(AviaoEntity aviao);
    }
}