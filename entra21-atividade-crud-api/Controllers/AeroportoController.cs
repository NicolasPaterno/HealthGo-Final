using MinhaPrimeiraApi.Entity;
using Microsoft.AspNetCore.Mvc;
using MinhaPrimeiraApi.Contracts.Services;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Aeroporto;
using MinhaPrimeiraApi.DTO.Aeroporto;

namespace MinhaPrimeiraApi.Controllers
{
    [ApiController]
    [Route("[controller]")] // = endpoint
    public class AeroportoController : ControllerBase
    {

        private IAeroportoService _service;

        public AeroportoController(IAeroportoService service)
        {
            _service = service;
        }

        [HttpGet("aeroportos")]  // o {aq dentro} é necessário na rota, OBRIGATÓRIO, por isso tinha 2 lá 
        public async Task<ActionResult<AeroportoGetAllResponse>> Get([FromQuery] int cidade_Id) //se colocar [FromQuery] vai pedir(ser opcional) um parâmetro
        {
            return Ok(await _service.Get(cidade_Id));
        }

        //[HttpGet("by-cidade/{cidade_Id}")] // o {aq dentro} é necessário na rota, OBRIGATÓRIO, por isso tinha 2 lá 
        //public async Task<ActionResult<AeroportoGetAllResponse>> GetByFilter(Aeroporto_Cidade_Id cidade_Id) //se colocar [FromQuery] vai pedir(ser opcional) um parâmetro
        //{
        //    return Ok(await _service.GetByFilter(cidade_Id));
        //}

        [HttpGet("by-id/{id}")]
        public async Task<ActionResult<AeroportoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(AeroportoDTO aeroporto)
        {
            return Ok(await _service.Post(aeroporto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(AeroportoEntity aeroporto)
        {
            return Ok(await _service.Update(aeroporto));
        }
    }
}