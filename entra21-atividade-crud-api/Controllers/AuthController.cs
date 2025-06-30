using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.Contracts.Service;
using Microsoft.AspNetCore.Mvc;

namespace entra21_atividade_crud_api.Controllers
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

            //Password verification using BCrypt
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
    }
}
