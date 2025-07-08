using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class HotelGetAllResponse
    {
        public IEnumerable<HotelEntity> Data { get; set; }
    }
}
