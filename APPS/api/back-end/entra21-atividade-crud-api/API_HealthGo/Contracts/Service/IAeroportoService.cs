using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IAeroportoService
    {
        Task<AeroportoGetAllResponse> Get(int cidade_Id); // para voltar apenas id de uma cidade

        Task<AeroportoEntity> GetById(int id);

        Task<MessageResponse> Post(AeroportoInsertDTO aeroporto);

        Task<MessageResponse> Update(AeroportoEntity aeroporto);

        Task<MessageResponse> Delete(int id);
    }
}