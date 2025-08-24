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
    }
}
