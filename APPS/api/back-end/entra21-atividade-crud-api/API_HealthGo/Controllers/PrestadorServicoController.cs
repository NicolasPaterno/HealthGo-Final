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

        [HttpGet("get_by_pessoa_id")]
        public async Task<ActionResult<PrestadorServicoEntity>> GetByPessoaId(int id)
        {
            return Ok(await _service.GetByPessoaId(id));
        }

        [HttpGet("com-especialidades")]
        public async Task<ActionResult<IEnumerable<PrestadorServicoEspecialidadeDTO>>> GetAllPrestadoresComEspecialidades()
        {
            var prestadores = await _service.GetAllPrestadoresComEspecialidades();
            if (prestadores == null || !prestadores.Any())
            {
                return NotFound();
            }
            return Ok(prestadores);
        }

        [HttpGet("agenda/{id}")]
        public async Task<ActionResult<IEnumerable<PrestadorServicoAgendaDTO>>> GetAgendaByPrestadorId(int id)
        {
            var agenda = await _service.GetAgendaByPrestadorId(id);
            if (agenda == null || !agenda.Any())
            {
                return NotFound("Agenda não encontrada para o prestador de serviço.");
            }
            return Ok(agenda);
        }

        [HttpGet("by-email-and-telefone")]
        public async Task<ActionResult<int>> GetByEmailAndTelefone([FromQuery] string email, [FromQuery] string telefone)
        {
            var prestador = await _service.GetByEmailAndTelefone(email, telefone);
            if (prestador == null)
            {
                return NotFound("Prestador de serviço não encontrado.");
            }
            return Ok(prestador);
        }
    }
}