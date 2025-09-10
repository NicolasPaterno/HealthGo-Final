using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdemServico_HotelController : ControllerBase
    {
        private IOrdemServico_HotelService _service;

        public OrdemServico_HotelController(IOrdemServico_HotelService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _service.GetAll();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entity = await _service.GetById(id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(entity);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrdemServico_HotelInsertDTO dto)
        {
            var response = await _service.Post(dto);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] OrdemServico_HotelEntity entity)
        {
            var response = await _service.Update(entity);
            if (response.Message.Contains("não encontrada"))
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _service.Delete(id);
            if (response.Message.Contains("não encontrada"))
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}
