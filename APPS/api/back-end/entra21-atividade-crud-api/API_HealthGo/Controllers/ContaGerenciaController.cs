using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ContaGerenciaController : ControllerBase
    {

        private IContaGerenciaService _service;

        public ContaGerenciaController(IContaGerenciaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ContaGerenciaGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContaGerenciaEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(ContaGerenciaInsertDTO contaGerencia)
        {
            return Ok(await _service.Post(contaGerencia));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(ContaGerenciaEntity contaGerencia)
        {
            return Ok(await _service.Update(contaGerencia));
        }
    }
}
}
