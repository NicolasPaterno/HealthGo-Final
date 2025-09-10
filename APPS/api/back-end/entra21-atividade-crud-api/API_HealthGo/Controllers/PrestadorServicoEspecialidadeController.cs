using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PrestadorServicoEspecialidadeController : ControllerBase
    {
        private readonly IPrestadorServicoEspecialidadeService _service;

        public PrestadorServicoEspecialidadeController(IPrestadorServicoEspecialidadeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<PrestadorServicoEspecialidadeGetAllResponse>> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PrestadorServicoEspecialidadeEntity>> GetById(int id)
        {
            var result = await _service.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post([FromBody] PrestadorServicoEspecialidadeInsertDTO entity)
        {
            var result = await _service.Post(entity);
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update([FromBody] PrestadorServicoEspecialidadeEntity entity)
        {
            var result = await _service.Update(entity);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            var result = await _service.Delete(id);
            return Ok(result);
        }

        [HttpGet("{id}/get-especialidades")]
        public async Task<ActionResult<IEnumerable<PrestadorServicoEspecialidadeEntity>>> GetAllEspecialidadesById(int id)
        {
            var especialidades = await _service.GetAllEspecialidadesById(id);

            return Ok(especialidades);
        }

        [HttpGet("{id}/get-id-by-function")]
        public async Task<ActionResult<int>> ReturnIdByFunction(int id, [FromQuery] string function)
        {
            if (string.IsNullOrEmpty(function))
            {
                return BadRequest("O parâmetro 'function' é obrigatório.");
            }

            var idPS = await _service.ReturnIdByFunction(id, function);

            if (idPS == 0)
            {
                return NotFound("Nenhum ID de especialidade encontrado para o prestador de serviço e função especificados.");
            }

            return Ok(idPS);
        }
    }
}
