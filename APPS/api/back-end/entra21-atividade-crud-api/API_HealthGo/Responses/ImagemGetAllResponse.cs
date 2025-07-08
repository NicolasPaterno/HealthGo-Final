using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class ImagemGetAllResponse
    {
        public IEnumerable<ImagemEntity> Data { get; set; }
    }
}
