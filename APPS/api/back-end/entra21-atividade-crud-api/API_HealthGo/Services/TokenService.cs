using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using API_HealthGo.Entities;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;

namespace API_HealthGo.Services
{
    public class TokenService : ITokenService
    {
        public readonly IConfiguration _configuration;
        private readonly IPrestadorServicoRepository _prestadorServicoRepository;

        public TokenService(IConfiguration configuration, IPrestadorServicoRepository prestadorServicoRepository)
        {
            _configuration = configuration;
            _prestadorServicoRepository = prestadorServicoRepository;
        }

        public string GenerateToken(PessoaEntity pessoa)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Verifica se a pessoa é um prestador de serviço
            string role = "usuario";
            var prestador = _prestadorServicoRepository.GetByPessoaId(pessoa.Id).GetAwaiter().GetResult();
            if (prestador != null)
            {
                role = "prestador";
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, pessoa.Nome),
                    new Claim(ClaimTypes.Email, pessoa.Email),
                    new Claim(ClaimTypes.NameIdentifier, pessoa.Id.ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:TokenValidityInMinutes"])),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
