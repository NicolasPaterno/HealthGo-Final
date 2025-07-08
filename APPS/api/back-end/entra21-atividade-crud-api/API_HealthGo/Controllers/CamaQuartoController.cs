using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CamaQuartoController : ControllerBase
    {
        private ICamaQuartoService _service;

        public CamaQuartoController(ICamaQuartoService camaQuartoService)
        {
            _service = camaQuartoService;
        }

        [HttpGet]
        public async Task<ActionResult<CamaQuartoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CamaQuartoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(CamaQuartoInsertDTO camaQuarto)
        {
            return Ok(await _service.Post(camaQuarto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(CamaQuartoEntity camaQuarto)
        {
            return Ok(await _service.Update(camaQuarto));
        }
    }
}