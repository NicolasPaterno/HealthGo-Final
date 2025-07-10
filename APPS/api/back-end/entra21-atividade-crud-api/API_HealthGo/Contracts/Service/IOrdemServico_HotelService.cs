using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IOrdemServico_HotelService
    {
        Task<OrdemServico_HotelGetAllResponse> GetAll();

        Task<OrdemServico_HotelEntity> GetById(int id);

        Task<MessageResponse> Post(OrdemServico_HotelInsertDTO ordemServico_Hotel);

        Task<MessageResponse> Update(OrdemServico_HotelEntity ordemServico_Hotel);

        Task<MessageResponse> Delete(int id);
    }
}
