using Microsoft.AspNetCore.Mvc;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;

namespace entra21_atividade_crud_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PassagemController : ControllerBase
    {
        private IPassagemService _service;

        public PassagemController(IPassagemService passagemService)
        {
            _service = passagemService;
        }

        [HttpGet]
        public async Task<ActionResult<PassagemGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PassagemEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(PassagemInsertDTO passagem)
        {
            return Ok(await _service.Post(passagem));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(PassagemEntity passagem)
        {
            return Ok(await _service.Update(passagem));
        }
    }
}

