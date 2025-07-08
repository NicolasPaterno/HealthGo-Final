using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class AviaoGetAllResponse
    {
        public IEnumerable<AviaoEntity> Data { get; set; }
    }
}
