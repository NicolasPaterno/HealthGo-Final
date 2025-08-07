using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuartoController : ControllerBase
    {
        private IQuartoService _service;

        public QuartoController(IQuartoService quartoService)
        {
            _service = quartoService;
        }

        [HttpGet]
        public async Task<ActionResult<QuartoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuartoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<QuartoGetAllResponse>> GetByHotelId(int hotelId)
        {
            return Ok(await _service.GetByHotelId(hotelId));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(QuartoInsertDTO quarto)
        {
            return Ok(await _service.Post(quarto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(QuartoEntity quarto)
        {
            return Ok(await _service.Update(quarto));
        }
    }
}