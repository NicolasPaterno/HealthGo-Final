using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ITokenService _tokenService;
        private readonly IAuthService _authService;

        public AuthController(IPessoaRepository pessoaRepository, ITokenService tokenService, IAuthService authService)
        {
            _pessoaRepository = pessoaRepository;
            _tokenService = tokenService;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var pessoa = await _pessoaRepository.GetPessoaByEmail(loginDto.Email);
            if (pessoa == null)
            {
                return Unauthorized(new { message = "Email ou senha inválidos." });
            }

            if (string.IsNullOrWhiteSpace(pessoa.Senha) || !pessoa.Senha.StartsWith("$2"))
            {
                return StatusCode(500, new { message = "Hash de senha inválido no banco de dados." });
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

        [HttpPost("recuperar-senha")]
        public async Task<IActionResult> RecuperarSenha([FromBody] string email)
        {
            try
            {
                await _authService.SolicitarRecuperacaoSenhaAsync(email);
                return Ok("Email de recuperação enviado.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{redefinir-senha}")]
        public async Task<IActionResult> RedefinirSenha([FromBody] RedefinirSenhaDTO dto)
        {
            try
            {
                await _authService.RedefinirSenhaAsync(dto);
                return Ok("Senha redefinida com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register-prestador")]
        public async Task<IActionResult> RegisterPrestador([FromBody] RegisterPrestadorDTO dto)
        {
            // Validação básica
            if (dto.Pessoa == null || dto.Prestador == null)
                return BadRequest(new { message = "Dados de pessoa ou prestador ausentes." });

            // Hash da senha
            if (string.IsNullOrWhiteSpace(dto.Pessoa.Senha) || dto.Pessoa.Senha.Length < 8)
                return BadRequest(new { message = "A senha deve ter no mínimo 8 caracteres." });
            dto.Pessoa.Senha = BCrypt.Net.BCrypt.HashPassword(dto.Pessoa.Senha);

            // Inserir pessoa
            await _pessoaRepository.InsertPessoa(dto.Pessoa);
            // Buscar pessoa pelo e-mail para pegar o ID
            var pessoaCriada = await _pessoaRepository.GetPessoaByEmail(dto.Pessoa.Email);
            if (pessoaCriada == null)
                return StatusCode(500, new { message = "Erro ao criar pessoa." });

            // Vincular pessoa ao prestador
            dto.Prestador.Pessoa_Id = pessoaCriada.Id;
            // Inserir prestador
            var prestadorRepo = HttpContext.RequestServices.GetService(typeof(IPrestadorServicoRepository)) as IPrestadorServicoRepository;
            if (prestadorRepo == null)
                return StatusCode(500, new { message = "Repositório de prestador não encontrado." });
            await prestadorRepo.Insert(dto.Prestador);

            return Ok(new { message = "Prestador cadastrado com sucesso!" });
        }
    }
}
