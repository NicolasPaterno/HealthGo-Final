using API_HealthGo.Entity;

namespace API_HealthGo.Response
{
    public class HotelGetAllResponse
    {
        public IEnumerable<HotelEntity> Data { get; set; }
    }
}
