using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Repository;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.Especialidade;
using entra21_atividade_crud_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace entra21_atividade_crud_api.Controllers 
{
    [ApiController] 
    [Route("[controller]")] 
    public class EspecialidadeController : ControllerBase
    {

        private IEspecialidadeService _service;

        public EspecialidadeController()
        {
            _service = new EspecialidadeService();
        }


        [HttpGet]
        public async Task<ActionResult<EspecialidadeGetAllResponse>> Get()
        {
            EspecialidadeRepository _repository = new EspecialidadeRepository();
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EspecialidadeEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id)); 
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(EspecialidadeInsertDTO specialty)
        {
            return Ok(await _service.Post(specialty));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(EspecialidadeEntity specialty)
        {
            return Ok(await _service.Update(specialty));
        }

    }
}