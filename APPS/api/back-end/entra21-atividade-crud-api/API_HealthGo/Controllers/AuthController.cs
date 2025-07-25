﻿using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Responses;
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

            if (string.IsNullOrWhiteSpace(loginDto.Password) || !pessoa.Senha.StartsWith("$2"))
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

        [HttpPost("redefinir-senha")]
        public async Task<IActionResult> RedefinirSenha([FromBody] RedefinirSenhaDTO dto)
        {
            if (!ModelState.IsValid) // para verificar se o DTO é válido
            {
                return BadRequest("DTO inválido.");
            }
            try
            {
                await _authService.RedefinirSenhaAsync(dto);
                return Ok("Senha redefinida com sucesso.");
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
    }
}
