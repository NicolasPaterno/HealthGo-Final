using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HotelController : ControllerBase
    {
        private IHotelService _service;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HotelController(IHotelService hotelService, IHttpContextAccessor httpContextAccessor)
        {
            _service = hotelService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<HotelGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HotelEntity>> GetHotelById(int id)
        {
            return Ok(await _service.GetHotelById(id));
        }

        [HttpPost]
        [Authorize(Roles = "Gerente")]
        public async Task<ActionResult<MessageResponse>> Post(HotelInsertDTO hotel)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int pessoaId))
            {
                return Unauthorized(new MessageResponse { Message = "ID do usuário não encontrado no token." });
            }
            return Ok(await _service.Post(hotel, pessoaId));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(HotelEntity hotel)
        {
            return Ok(await _service.Update(hotel));
        }
    }
}