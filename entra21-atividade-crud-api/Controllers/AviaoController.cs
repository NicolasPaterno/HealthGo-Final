using Microsoft.AspNetCore.Mvc;
using MinhaPrimeiraApi.Contracts.Service;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response.Especialidade;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Services;

namespace MinhaPrimeiraApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AviaoController : ControllerBase
    {
        private IAviaoService _service;

        public AviaoController(IAviaoService aviaoService)
        {
            _service = aviaoService;
        }

        [HttpGet]
        public async Task<ActionResult<AviaoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AviaoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(AviaoInsertDTO aviao)
        {
            return Ok(await _service.Post(aviao));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(AviaoEntity aviao)
        {
            return Ok(await _service.Update(aviao));
        }
    }
}
