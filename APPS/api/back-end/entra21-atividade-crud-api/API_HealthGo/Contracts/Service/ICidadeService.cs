using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface ICidadeService
    {
        Task<MessageResponse> Delete(int id);

        Task<CidadeGetAllResponse> GetAll();

        Task<CidadeEntity> GetById(int id);

        Task<MessageResponse> Post(CidadeInsertDTO cidade);

        Task<MessageResponse> Update(CidadeEntity cidade);
    }
}