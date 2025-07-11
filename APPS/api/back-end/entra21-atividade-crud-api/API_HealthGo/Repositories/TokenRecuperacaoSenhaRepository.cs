using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using Dapper;

namespace API_HealthGo.Repositories
{
    public class TokenRecuperacaoSenhaRepository : ITokenRecuperacaoSenhaRepository
    {
        private IConnection _connection;

        public TokenRecuperacaoSenhaRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task SaveAsync(TokenRecuperacaoSenhaEntity token)
        {
            using var conn = _connection.GetConnection();

            var sql = @"INSERT INTO TokenRecuperacaoSenha (PESSOA_ID, TOKEN, DATAEXPIRACAO, FOIUSADO)
                    VALUES (@Pessoa_Id, @Token, @DataExpiracao, 0)";
            await conn.ExecuteAsync(sql, token);
        }

        public async Task<TokenRecuperacaoSenhaEntity?> GetByTokenAsync(string token)
        {
            using var conn = _connection.GetConnection();

            var sql = @"SELECT * FROM TokenRecuperacaoSenha 
                    WHERE TOKEN = @Token AND FoiUsado = 0 AND DataExpiracao > GETUTCDATE()";
            return await conn.QueryFirstOrDefaultAsync<TokenRecuperacaoSenhaEntity>(sql, new { Token = token });
        }

        public async Task MarkAsUsedAsync(string token)
        {
            using var conn = _connection.GetConnection();

            var sql = @"UPDATE TokenRecuperacaoSenha SET FOIUSADO = 1 WHERE TOKEN = @Token";
            await conn.ExecuteAsync(sql, new { Token = token });
        }
    }
}
