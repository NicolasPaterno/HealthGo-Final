using API_HealthGo.DTO;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IHospitalService
    {
        Task<HospitalGetAllResponse> GetHospitais(string uf, int limit, int page, string? nome);
    }
}