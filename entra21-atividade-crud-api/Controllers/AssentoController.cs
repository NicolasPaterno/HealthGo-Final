using Microsoft.AspNetCore.Mvc;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Response.VooResponse;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssentoController : ControllerBase
    {
        private IAssentoService _service;

        public AssentoController(IAssentoService assentoService)
        {
            _service = assentoService;
        }

        [HttpGet]
        public async Task<ActionResult<AssentoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AssentoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(AssentoInsertDTO assento)
        {
            return Ok(await _service.Post(assento));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(AssentoEntity assento)
        {
            return Ok(await _service.Update(assento));
        }
    }
}