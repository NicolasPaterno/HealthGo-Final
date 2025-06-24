using APIHealthGo.Contracts.Service;
using APIHealthGo.Response;
using APIHealthGo.Services;
using Microsoft.AspNetCore.Mvc;
using MyFirstCRUD.Contracts.Repository;
using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;

namespace APIHealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GerenciaController : ControllerBase
    {
        private IGerenciaService _service;

        public GerenciaController(IGerenciaService gerenciaService)
        {
            _service = gerenciaService;
        }

    [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllGerencia());
        }

        [HttpGet("(id)")]
        public async Task<IActionResult> GetGerenciaById(int id)
        {
            return Ok(await _service.GetGerenciaById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(GerenciaInsertDTO gerencia)
        {
            return Ok(await _service.Post(gerencia));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(GerenciaEntity gerencia)
        {
            return Ok(await _service.Update(gerencia));
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

    }
}
