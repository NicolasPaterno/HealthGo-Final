using API_HealthGo.DTO;

namespace API_HealthGo.Responses
{
    public class HospitalGetAllResponse
    {
        public IEnumerable<HospitalDTO> Data { get; set; }
        public int Total { get; set; }
    }
}