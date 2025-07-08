using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
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