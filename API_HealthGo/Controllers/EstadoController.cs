using Microsoft.AspNetCore.Mvc;
using API_HealthGo.Response.Estado;
using API_HealthGo.Response;
using API_HealthGo.Entity;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EstadoController : ControllerBase
    {

        private IEstadoService _service;

        public EstadoController(IEstadoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<EstadoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(EstadoInsertDTO estado)
        {
            return Ok(await _service.Post(estado));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(EstadoEntity estado)
        {
            return Ok(await _service.Update(estado));
        }
    }
}