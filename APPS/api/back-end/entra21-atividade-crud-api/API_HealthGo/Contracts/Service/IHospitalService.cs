// APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/Contracts/Service/IHospitalService.cs
using API_HealthGo.DTO;

namespace API_HealthGo.Contracts.Service
{
    public interface IHospitalService
    {
        Task<IEnumerable<HospitalDTO>> GetHospitais(string uf, int limit, int page);
    }
}