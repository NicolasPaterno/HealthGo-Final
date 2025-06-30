using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface IEspecialidadeRepository
    {
        Task<IEnumerable<EspecialidadeEntity>> GetAll();

        Task<EspecialidadeEntity> GetById(int id);

        Task Insert(EspecialidadeInsertDTO especialidade);

        Task Delete(int id);

        Task Update(EspecialidadeEntity especialidade);
    }
}