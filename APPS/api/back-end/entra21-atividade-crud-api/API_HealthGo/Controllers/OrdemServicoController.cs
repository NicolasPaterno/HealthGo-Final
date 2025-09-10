using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;
using API_HealthGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdemServicoController : ControllerBase
    {
        private IOrdemServicoService _service;

        public OrdemServicoController(IOrdemServicoService ordemServicoService)
        {
            _service = ordemServicoService;
        }

        [HttpGet]
        public async Task<ActionResult<OrdemServicoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrdemServicoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(OrdemServicoInsertDTO ordemServico)
        {
            return Ok(await _service.Post(ordemServico));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(OrdemServicoEntity ordemServico)
        {
            return Ok(await _service.Update(ordemServico));
        }

        [HttpGet("latest/{pessoaId}")]
        public async Task<IActionResult> GetLatestOrdemServicoByPessoaId(int pessoaId)
        {
            var ordemServicoId = await _service.GetLatestOrdemServicoByPessoaId(pessoaId);
            if (ordemServicoId == 0)
            {
                return NotFound();
            }
            return Ok(ordemServicoId);
        }

        [HttpGet("historico/{pessoaId}")]
        public async Task<ActionResult<IEnumerable<HistoricoComprasDTO>>> GetHistoricoCompras(int pessoaId)
        {
            return Ok(await _service.GetHistoricoCompras(pessoaId));
        }
    }
}