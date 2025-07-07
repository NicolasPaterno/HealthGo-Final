using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface ILembreteService
    {
        Task<LembreteGetAllResponse> GetAll();

        Task<LembreteEntity> GetById(int id);

        Task<MessageResponse> Post(LembreteInsertDTO lembrete);

        Task<MessageResponse> Update(LembreteEntity lembrete);

        Task<MessageResponse> Delete(int id);
    }
}