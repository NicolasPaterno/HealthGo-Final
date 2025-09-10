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
            var result = await _service.GetByHotelId(hotelId);
            Console.WriteLine($"Retornando quartos para hotel {hotelId}: {result.Data?.Count()} quartos");
            return Ok(result);
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
            Console.WriteLine($"Controller recebeu quarto para atualização: ID={quarto.Id}, Número={quarto.Numero}");
            var result = await _service.Update(quarto);
            
            // Verificar se há mensagem de erro na resposta
            if (result.Message.Contains("obrigatório") || 
                result.Message.Contains("deve ser maior") || 
                result.Message.Contains("não encontrado"))
            {
                return BadRequest(result);
            }
            
            return Ok(result);
        }
    }
}