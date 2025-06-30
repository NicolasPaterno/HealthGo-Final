using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using Microsoft.AspNetCore.Mvc;

namespace entra21_atividade_crud_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LembreteController : ControllerBase
    {
        private ILembreteService _service;

        public LembreteController(ILembreteService lembreteService)
        {
            _service = lembreteService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllLembrete());
        }

        [HttpGet("(id)")]
        public async Task<IActionResult> GetLembreteById(int id)
        {
            return Ok(await _service.GetLembreteById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(LembreteInsertDTO lembrete)
        {
            return Ok(await _service.Post(lembrete));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(LembreteEntity lembrete)
        {
            return Ok(await _service.Update(lembrete));
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

    }
}
