using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface ILembreteRepository
    {
        Task<IEnumerable<LembreteEntity>> GetAllLembrete();
        Task<LembreteEntity> GetLembreteById(int id);
        Task<IEnumerable<LembreteEntity>> GetLembreteByPessoaId(int pessoaId);
        Task InsertLembrete(LembreteInsertDTO lembrete);
        Task UpdateLembrete(LembreteEntity lembrete);
        Task DeleteLembrete(int id);
    }
}