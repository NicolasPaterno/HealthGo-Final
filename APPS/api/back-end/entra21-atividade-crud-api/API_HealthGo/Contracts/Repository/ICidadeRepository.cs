using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface ICidadeRepository
    {
        Task<IEnumerable<CidadeEntity>> GetAll();

        Task<CidadeEntity> GetById(int id);

        Task Insert(CidadeInsertDTO cidade);

        Task Delete(int id);

        Task Update(CidadeEntity cidade);
    }
}