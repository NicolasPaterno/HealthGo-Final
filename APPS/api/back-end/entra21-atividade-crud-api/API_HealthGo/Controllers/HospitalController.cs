// APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/Controllers/HospitaisController.cs
using API_HealthGo.Contracts.Service;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitaisController : ControllerBase
    {
        private readonly IHospitalService _hospitalService;

        public HospitaisController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string uf, [FromQuery] int limit = 100, [FromQuery] int page = 0)
        {
            if (string.IsNullOrEmpty(uf))
            {
                return BadRequest("O parâmetro 'uf' é obrigatório.");
            }

            var hospitais = await _hospitalService.GetHospitais(uf, limit, page);
            return Ok(hospitais);
        }
    }
}