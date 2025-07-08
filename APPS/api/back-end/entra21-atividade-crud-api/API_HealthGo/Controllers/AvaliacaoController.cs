using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AvaliacaoController : ControllerBase
    {
        private IAssentoService _service;

        public AvaliacaoController(IAvaliacaoService avaliacaoService)
        {
            _service = avaliacaoService;
        }

        [HttpGet]
        public async Task<ActionResult<AvaliacaoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AvaliacaoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(AvaliacaoInsertDTO avaliacao)
        {
            return Ok(await _service.Post(avaliacao));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(AvaliacaoEntity avaliacao)
        {
            return Ok(await _service.Update(avaliacao));
        }
    }
}