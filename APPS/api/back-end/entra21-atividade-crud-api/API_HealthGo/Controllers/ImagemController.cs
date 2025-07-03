using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response.Estado;
using API_HealthGo.Response;
using Microsoft.AspNetCore.Mvc;
using API_HealthGo.Response.Lembrete;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImagemController : ControllerBase
    {

        private IImagemService _imagem;

        public ImagemController(IImagemService imagem)
        {
            _imagem = imagem;
        }

        [HttpGet]
        public async Task<ActionResult<ImagemGetAllResponse>> Get()
        {
            return Ok(await _imagem.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ImagemEntity>> GetById(int id)
        {
            return Ok(await _imagem.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(ImagemInsertDTO imagem)
        {
            return Ok(await _imagem.Post(imagem));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _imagem.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(ImagemEntity imagem)
        {
            return Ok(await _imagem.Update(imagem));
        }
    }
}