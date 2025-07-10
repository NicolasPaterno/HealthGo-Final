using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IHotelRepository
    {
        Task<IEnumerable<HotelEntity>> GetAll();

        Task<HotelEntity> GetById(int id);

        Task Insert(HotelInsertDTO hotel);

        Task Delete(int id);

        Task Update(HotelEntity hotel);
    }
}
