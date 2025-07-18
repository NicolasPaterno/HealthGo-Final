using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrimeiraAPI.Contracts.Service;
using PrimeiraAPI.Response.Hotel;

namespace PrimeiraAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HotelController : ControllerBase
    {
        private IHotelService _service;

        public HotelController(IHotelService hotelService)
        {
            _service = hotelService;
        }
        [HttpGet]
        public async Task<ActionResult<HotelGetAllResponse>> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HotelEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Put(HotelEntity hotel)
        {
            return Ok(await _service.Put(hotel));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<HotelGetAllResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpGet("cidade/{cidadeId}")]
        public async Task<ActionResult<HotelEntity>> GetByCidadeId(int cidadeId)
        {
            return Ok(await _service.GetByCidadeId(cidadeId));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(HotelInsertDTO hotel)
        {
            return Ok(await _service.Post(hotel));  
        }
    }
}
