using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface ILembreteRepository
    {
        Task<IEnumerable<LembreteEntity>> GetAllLembrete();

        Task<LembreteEntity> GetLembreteById(int id);

        Task InsertLembrete(LembreteInsertDTO lembrete);

        Task UpdateLembrete(LembreteEntity lembrete);

        Task DeleteLembrete(int id);
    }
}