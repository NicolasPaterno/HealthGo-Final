using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface IOrdemServico_HotelRepository
    {
        Task<IEnumerable<OrdemServico_HotelEntity>> GetAll();

        Task<OrdemServico_HotelEntity> GetById(int id);

        Task Insert(OrdemServico_HotelInsertDTO ordemServico_Hotel);

        Task Delete(int id);

        Task Update(OrdemServico_HotelEntity ordemServico_Hotel);
    }
}
