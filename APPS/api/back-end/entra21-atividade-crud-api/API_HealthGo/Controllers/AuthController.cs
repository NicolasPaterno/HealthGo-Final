// Controllers/AuthController.cs
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using Microsoft.AspNetCore.Mvc;
using API_HealthGo.Entities;
using API_HealthGo.Contracts.Repository; // Certifique-se de ter os usings corretos

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly IPrestadorServicoRepository _prestadorServicoRepository; // Injetado
        private readonly IContaGerenciaRepository _contaGerenciaRepository; // Injetado
        private readonly ITokenService _tokenService;

        public AuthController(IPessoaRepository pessoaRepository,
                              IPrestadorServicoRepository prestadorServicoRepository,
                              IContaGerenciaRepository contaGerenciaRepository,
                              ITokenService tokenService)
        {
            _pessoaRepository = pessoaRepository;
            _prestadorServicoRepository = prestadorServicoRepository;
            _contaGerenciaRepository = contaGerenciaRepository;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.UserType))
            {
                return BadRequest(new { message = "Tipo de usuário não especificado." });
            }

            switch (loginDto.UserType.ToLower())
            {
                case "pessoa": // Para usuários comuns
                    var pessoa = await _pessoaRepository.GetPessoaByEmail(loginDto.Email);
                    if (pessoa != null && BCrypt.Net.BCrypt.Verify(loginDto.Password, pessoa.Senha))
                    {
                        // Verifica se esta Pessoa também é um PrestadorServico
                        var prestador = await _prestadorServicoRepository.GetPrestadorServicoByPessoaId(pessoa.Id);
                        if (prestador != null)
                        {
                            // Se a pessoa for um prestador de serviço, redirecionar para o fluxo de PrestadorServico
                            // ou retornar um erro se "pessoa" não for o tipo esperado para PrestadorServico
                            // Neste caso, vamos retornar um erro e esperar que o frontend envie "prestadorservico"
                            return Unauthorized(new { message = "Credenciais válidas, mas o tipo de usuário selecionado não corresponde ao perfil de Prestador de Serviço. Por favor, selecione 'Prestador de Serviço'." });
                        }

                        var tokenPessoa = _tokenService.GenerateToken(pessoa.Id, pessoa.Email, "Pessoa");
                        return Ok(new { token = tokenPessoa, user = new { pessoa.Id, pessoa.Nome, pessoa.Email, UserType = "Pessoa" } });
                    }
                    break;

                case "prestadorservico": // Para prestadores de serviço
                    var pessoaPrestador = await _pessoaRepository.GetPessoaByEmail(loginDto.Email);
                    if (pessoaPrestador != null && BCrypt.Net.BCrypt.Verify(loginDto.Password, pessoaPrestador.Senha))
                    {
                        var prestador = await _prestadorServicoRepository.GetPrestadorServicoByPessoaId(pessoaPrestador.Id);
                        if (prestador != null)
                        {
                            var tokenPrestador = _tokenService.GenerateToken(pessoaPrestador.Id, pessoaPrestador.Email, "PrestadorServico");
                            return Ok(new { token = tokenPrestador, user = new { pessoaPrestador.Id, pessoaPrestador.Nome, pessoaPrestador.Email, UserType = "PrestadorServico" } });
                        }
                    }
                    break;

                case "contagerencia": // Para donos de hotel
                    var contaGerencia = await _contaGerenciaRepository.GetContaGerenciaByEmail(loginDto.Email);
                    if (contaGerencia != null && BCrypt.Net.BCrypt.Verify(loginDto.Password, contaGerencia.Senha))
                    {
                        var tokenContaGerencia = _tokenService.GenerateToken(contaGerencia.Id, contaGerencia.Email, "ContaGerencia");
                        return Ok(new { token = tokenContaGerencia, user = new { contaGerencia.Id, contaGerencia.Nome, contaGerencia.Email, UserType = "ContaGerencia" } });
                    }
                    break;

                default:
                    // Se o UserType enviado não for reconhecido
                    return BadRequest(new { message = "Tipo de usuário inválido." });
            }

            // Se nenhuma autenticação foi bem-sucedida para o tipo de usuário especificado
            return Unauthorized(new { message = "Email ou senha inválidos para o tipo de usuário selecionado." });
        }
    }
}