using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class PessoaController : ControllerBase
    {
        private IPessoaService _service;

        public PessoaController(IPessoaService pessoaService)
        {
            _service = pessoaService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllPessoa());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPessoaById(int id)
        {
            return Ok(await _service.GetPessoaById(id));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PessoaInsertDTO pessoa)
        {
            try
            {
                var response = await _service.Post(pessoa); // Chama o serviço
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                // Retorna 400 Bad Request se a senha for inválida
                return BadRequest(new MessageResponse { Message = ex.Message });
            }
            catch (Exception ex)
            {
                // Retorna 500 para outros erros
                var response = new MessageResponse { Message = $"Ocorreu um erro interno: {ex.Message}" };
                return StatusCode(500, response);
            }
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(PessoaEntity pessoa)
        {
            return Ok(await _service.Update(pessoa));
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDto)
        {
            try
            {
                var response = await _service.ChangePassword(changePasswordDto);
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new MessageResponse { Message = ex.Message });
            }
            catch (Exception ex)
            {
                var response = new MessageResponse { Message = $"Ocorreu um erro interno: {ex.Message}" };
                return StatusCode(500, response);
            }
        }

        [HttpPut("change-email")]
        public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailDTO changeEmailDto)
        {
            try
            {
                var response = await _service.ChangeEmail(changeEmailDto);
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new MessageResponse { Message = ex.Message });
            }
            catch (Exception ex)
            {
                var response = new MessageResponse { Message = $"Ocorreu um erro interno: {ex.Message}" };
                return StatusCode(500, response);
            }
        }

        [HttpDelete("(id)")]
        [Authorize(Roles = "Gerente")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }
        [HttpGet("me")]
        [Authorize]

        public async Task<IActionResult> GetCurrentUserProfile()
        {
            // Get the user ID from the JWT claims
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized(new { message = "ID de usuário não encontrado nos claims do token." });
            }

            try
            {
                var pessoa = await _service.GetPessoaById(userId);
                if (pessoa == null)
                {
                    return NotFound(new { message = "Usuário não encontrado." });
                }

                return Ok(new
                {
                    pessoa.Id,
                    pessoa.Nome,
                    pessoa.Email,
                    pessoa.DataNascimento,
                    pessoa.CPF,
                    pessoa.Telefone,
                    pessoa.EnderecoFoto,
                    pessoa.CaoGuia,
                    pessoa.CEP,
                    pessoa.Bairro,
                    pessoa.Rua,
                    pessoa.NumeroEndereco,
                    pessoa.Cidade_Id
                });
            }
            catch (Exception ex)
            {
                // Log the exception (recommended)
                return StatusCode(500, new { message = $"Ocorreu um erro interno ao buscar o perfil: {ex.Message}" });
            }
        }
    }
}