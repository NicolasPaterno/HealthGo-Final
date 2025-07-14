using Microsoft.AspNetCore.Mvc;
using API_HealthGo.Response;
using API_HealthGo.DTO;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Entities;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")] // = endpoint
    public class AeroportoController : ControllerBase
    {

        private IAeroportoService _service;

        public AeroportoController(IAeroportoService service)
        {
            _service = service;
        }

        [HttpGet("aeroportos")]
        public async Task<ActionResult<AeroportoGetAllResponse>> Get([FromQuery] int cidade_Id)
        {
            return Ok(await _service.Get(cidade_Id));
        }

        [HttpGet("by-id/{id}")]
        public async Task<ActionResult<AeroportoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(AeroportoInsertDTO aeroporto)
        {
            return Ok(await _service.Post(aeroporto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(AeroportoEntity aeroporto)
        {
            return Ok(await _service.Update(aeroporto));
        }
    }
}