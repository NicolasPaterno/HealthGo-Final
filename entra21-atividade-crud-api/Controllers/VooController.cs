using Microsoft.AspNetCore.Mvc;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;

namespace entra21_atividade_crud_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VooController : ControllerBase
    {
        private IVooService _service;

        public VooController(IVooService vooService)
        {
            _service = vooService;
        }

        [HttpGet]
        public async Task<ActionResult<VooGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VooEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(VooInsertDTO voo)
        {
            return Ok(await _service.Post(voo));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(VooEntity voo)
        {
            return Ok(await _service.Update(voo));
        }
    }
}

