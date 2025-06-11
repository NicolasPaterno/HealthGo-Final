using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface IEspecialidadeRepository
    {
        Task<IEnumerable<EspecialidadeEntity>> GetAll();

        Task Insert(EspecialidadeInsertDTO newSpecialty);

        Task Update(EspecialidadeEntity specialty);

        Task<EspecialidadeEntity> GetById(int id);

        Task Delete(int id);

    }
}