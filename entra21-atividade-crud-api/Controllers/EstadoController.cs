using Microsoft.AspNetCore.Mvc;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.Estado;

namespace entra21_atividade_crud_api.Controllers
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