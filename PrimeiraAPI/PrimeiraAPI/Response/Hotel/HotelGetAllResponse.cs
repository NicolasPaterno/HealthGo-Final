using atividade_bd_csharp.Entity;

namespace PrimeiraAPI.Response.Hotel
{
    public class HotelGetAllResponse
    {
        public IEnumerable<HotelEntity> Data { get; set; }

    }
}
