using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
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