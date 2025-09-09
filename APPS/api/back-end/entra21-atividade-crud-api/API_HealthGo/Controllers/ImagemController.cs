using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImagemController : ControllerBase
    {

        private IImagemService _service;

        public ImagemController(IImagemService imagem)
        {
            _service = imagem;
        }

        [HttpGet]
        public async Task<ActionResult<ImagemGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ImagemEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(ImagemInsertDTO imagem)
        {
            return Ok(await _service.Post(imagem));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(ImagemEntity imagem)
        {
            return Ok(await _service.Update(imagem));
        }
    }
}