using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;

namespace MinhaPrimeiraApi.Contracts.Repository
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