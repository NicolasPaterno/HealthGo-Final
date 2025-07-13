using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ITokenService _tokenService;

        public AuthController(IPessoaRepository pessoaRepository, ITokenService tokenService)
        {
            _pessoaRepository = pessoaRepository;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var pessoa = await _pessoaRepository.GetPessoaByEmail(loginDto.Email);
            if (pessoa == null)
            {
                return Unauthorized(new { message = "Email ou senha inválidos." });
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, pessoa.Senha);
            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Email ou senha inválidos." });
            }

            var token = _tokenService.GenerateToken(pessoa);
            return Ok(new
            {
                token,
                user = new { pessoa.Id, pessoa.Nome, pessoa.Email }
            });
        }

        [HttpGet("me")]
        [Authorize] 
        public async Task<IActionResult> GetCurrentUser()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out int userId))
            {
                return Unauthorized(new { message = "Token inválido ou ID de usuário não encontrado." });
            }

            var pessoa = await _pessoaRepository.GetPessoaById(userId);
            if (pessoa == null)
            {
                return NotFound(new { message = "Usuário não encontrado." });
            }

            return Ok(new { pessoa.Id, pessoa.Nome, pessoa.Email, pessoa.CPF, pessoa.DataNascimento, pessoa.Telefone, pessoa.CEP, pessoa.Bairro, pessoa.Rua, pessoa.NumeroEndereco, pessoa.Cidade_Id, pessoa.CaoGuia });
        }
    }
}