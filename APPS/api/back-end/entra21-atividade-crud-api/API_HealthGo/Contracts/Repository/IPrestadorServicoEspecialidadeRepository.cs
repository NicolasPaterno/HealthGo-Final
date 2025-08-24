using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repository
{
    public interface IPrestadorServicoEspecialidadeRepository
    {
        Task<IEnumerable<PrestadorServicoEspecialidadeEntity>> GetAll();
        Task<PrestadorServicoEspecialidadeEntity> GetById(int id);
        Task Insert(PrestadorServicoEspecialidadeInsertDTO entity);
        Task Update(PrestadorServicoEspecialidadeEntity entity);
        Task Delete(int id);
    }
}
