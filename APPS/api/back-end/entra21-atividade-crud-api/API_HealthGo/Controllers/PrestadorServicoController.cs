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
    public class PrestadorServicoController : ControllerBase
    {
        private IPrestadorServicoService _service;

        public PrestadorServicoController(IPrestadorServicoService prestadorServicoService)
        {
            _service = prestadorServicoService;
        }

        [HttpGet]
        public async Task<ActionResult<PrestadorServicoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("all_infos")]
        public async Task<ActionResult<PrestadorServicoGetAllResponse>> GetAllInfos()
        {
            return Ok(await _service.GetPrestadorAllInfos());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PrestadorServicoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(PrestadorServicoInsertDTO prestadorServico)
        {
            return Ok(await _service.Post(prestadorServico));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(PrestadorServicoEntity prestadorServico)
        {
            return Ok(await _service.Update(prestadorServico));
        }

    }
}