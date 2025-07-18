using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrimeiraAPI.Contracts.Service;
using PrimeiraAPI.Response.Quarto;

namespace PrimeiraAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuartoController : ControllerBase
    {
        private IQuartoService _quartoService;

        public QuartoController(IQuartoService quartoService)
        {
            _quartoService = quartoService;
        }


        [HttpGet]
        public async Task<ActionResult<QuartoGetAllResponse>> Get()
        {
            return Ok(await _quartoService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuartoEntity>> GetById(int id)
        {
            return Ok(await _quartoService.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(QuartoInsertDTO quarto)
        {
            return Ok(await _quartoService.Post(quarto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _quartoService.Delete(id));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MessageResponse>> Put([FromRoute] int id, [FromBody] QuartoInsertDTO dto)
        {
            // Se necessário, crie o QuartoEntity a partir do DTO aqui ou ajuste a chamada do serviço
            var entity = new QuartoEntity
            {
                Numero = dto.Numero,
                Andar = dto.Andar,
                AceitaAnimal = dto.AceitaAnimal,
                Observacao = dto.Obs,
                Preco = dto.Preco,
                EnderecoFoto = dto.Endereco,
                LimitePessoa = dto.LimitePessoas,
                Hotel_id = dto.HotelId
            };
            return Ok(await _quartoService.Put(id, entity, dto));
        }
    }
}