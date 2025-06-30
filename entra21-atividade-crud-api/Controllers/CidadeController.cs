using Microsoft.AspNetCore.Mvc;
using entra21_atividade_crud_api.Response.Cidade;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.DTO;

namespace entra21_atividade_crud_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CidadeController : ControllerBase
    {

        private ICidadeService _service;

        public CidadeController(ICidadeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<CidadeGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CidadeEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(CidadeInsertDTO cidade)
        {
            return Ok(await _service.Post(cidade));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(CidadeEntity cidade)
        {
            return Ok(await _service.Update(cidade));
        }
    }
}