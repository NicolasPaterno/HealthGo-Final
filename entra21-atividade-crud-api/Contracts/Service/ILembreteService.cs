using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface ILembreteService
    {
        Task<LembreteGetAllResponse> GetAllLembrete();

        Task<LembreteEntity> GetLembreteById(int id);

        Task<MessageResponse> Post(LembreteInsertDTO lembrete);

        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Update(LembreteEntity lemberete);
    }
}