using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface IAssentoRepository
    {
        Task<IEnumerable<AssentoEntity>> GetAll();

        Task<AssentoEntity> GetById(int id);

        Task Insert(AssentoInsertDTO assento);

        Task Delete(int id);

        Task Update(AssentoEntity assento);
    }
}