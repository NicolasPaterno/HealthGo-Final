using System.Net.Sockets;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrimeiraAPI.Contracts.Service;
using PrimeiraAPI.Response.CamaQuarto;
using PrimeiraAPI.Services;


namespace PrimeiraAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CamaQuartoController : ControllerBase
    {
        private ICamaQuartoService _service;

        public CamaQuartoController(ICamaQuartoService camaquartoService)
        {
            _service = camaquartoService;
        }
        [HttpGet]
        public async Task<ActionResult<CamaQuartoGetAllResponse>> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CamaQuartoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPut]
        public async Task<ActionResult<CamaQuartoGetAllResponse>> Put(CamaQuartoEntity camaQuarto)
        {
            return Ok(await _service.Put(camaQuarto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CamaQuartoGetAllResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpGet("tipocama")]
        public async Task<ActionResult<CamaQuartoEntity>> GetByTipoCama([FromQuery] string[] tiposcama)
        {
            return Ok(await _service.GetByTipoCama(tiposcama));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(CamaQuartoInsertDTO camaquarto)
        {
            return Ok(await _service.Post(camaquarto));
        }
    }
}
        

