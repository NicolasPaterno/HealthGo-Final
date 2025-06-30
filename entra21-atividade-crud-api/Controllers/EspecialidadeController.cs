using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;
using Microsoft.AspNetCore.Mvc;

namespace entra21_atividade_crud_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EspecialidadeController : ControllerBase
    {
        private IEspecialidadeService _service;

        public EspecialidadeController(IEspecialidadeService especialidadeService)
        {
            _service = especialidadeService;
        }

        [HttpGet]
        public async Task<ActionResult<EspecialidadeGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EspecialidadeEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(EspecialidadeInsertDTO especialidade)
        {
            return Ok(await _service.Post(especialidade));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(EspecialidadeEntity especialidade)
        {
            return Ok(await _service.Update(especialidade));
        }
    }
}
