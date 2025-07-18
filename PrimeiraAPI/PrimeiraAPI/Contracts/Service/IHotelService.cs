using System.Threading.Tasks;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using PrimeiraAPI.Response.CamaQuarto;
using PrimeiraAPI.Response.Hotel;

namespace PrimeiraAPI.Contracts.Service
{
    public interface IHotelService
    {
        
        Task<HotelGetAllResponse> GetAll();
        Task<HotelEntity> GetByCidadeId(int cidadeId);
        Task<MessageResponse> Put(HotelEntity hotel);
        Task<MessageResponse> Post(HotelInsertDTO hotel);
        Task<HotelGetAllResponse> Delete(int id);
        Task<HotelEntity> GetById(int id);
    }
}
