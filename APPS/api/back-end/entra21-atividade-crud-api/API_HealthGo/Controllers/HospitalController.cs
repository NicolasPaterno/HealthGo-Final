// APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/Controllers/HospitalController.cs
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
        public async Task<IActionResult> Get([FromQuery] string uf, [FromQuery] int limit = 21, [FromQuery] int page = 0, [FromQuery] string? nome = null)
        {
            if (string.IsNullOrEmpty(uf))
            {
                return BadRequest("O parâmetro 'uf' é obrigatório.");
            }

            var hospitais = await _hospitalService.GetHospitais(uf, limit, page, nome);
            return Ok(hospitais);
        }
    }
}