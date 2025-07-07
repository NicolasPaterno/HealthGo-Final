using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
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
