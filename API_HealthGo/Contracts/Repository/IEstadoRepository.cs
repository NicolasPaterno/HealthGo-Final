using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface IEstadoRepository
    {
        Task<IEnumerable<EstadoEntity>> GetAll();

        Task<EstadoEntity> GetById(int id);

        Task Insert(EstadoInsertDTO estado);

        Task Delete(int id);

        Task Update(EstadoEntity estado);
    }
}