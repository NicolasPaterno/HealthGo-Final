using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using API_HealthGo.Contracts.Service;

namespace API_HealthGo.Services
{
    public class TokenService : ITokenService
    {
        public readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(int userId, string userEmail, string userRole)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Email, userEmail),
                new Claim(ClaimTypes.Role, userRole), // Adiciona o tipo de usuário como uma "claim" de role
                new Claim(ClaimTypes.Name, userEmail) // Usando o email como nome principal no token
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
<<<<<<< HEAD
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, pessoa.Nome),
                    new Claim(ClaimTypes.Email, pessoa.Email),
                    new Claim(ClaimTypes.NameIdentifier, pessoa.Id.ToString()),
                    new Claim(ClaimTypes.Role, pessoa.Role.ToString())
                }),
=======
                Subject = new ClaimsIdentity(claims),
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
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