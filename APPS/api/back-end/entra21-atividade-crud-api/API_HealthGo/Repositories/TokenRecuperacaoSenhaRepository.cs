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

            var sql = @"INSERT INTO TokenRecuperacaoSenha (PESSOA_ID, TOKEN, DATAEXPIRACAO)
                    VALUES (@Pessoa_Id, @Token, @DataExpiracao)";
            await conn.ExecuteAsync(sql, token);
        }

        public async Task<TokenRecuperacaoSenhaEntity?> GetByTokenAsync(string token)
        {
            using var conn = _connection.GetConnection();

            string sql = @$"
                             SELECT 
                                 ID AS {nameof(TokenRecuperacaoSenhaEntity.Id)},
                                 PESSOA_ID AS {nameof(TokenRecuperacaoSenhaEntity.Pessoa_Id)},
                                 TOKEN AS {nameof(TokenRecuperacaoSenhaEntity.Token)},
                                 DATAEXPIRACAO AS {nameof(TokenRecuperacaoSenhaEntity.DataExpiracao)}
                              FROM TokenRecuperacaoSenha
                              WHERE TOKEN = @Token AND DataExpiracao > UTC_TIMESTAMP()
                            ";

            return await conn.QueryFirstOrDefaultAsync<TokenRecuperacaoSenhaEntity>(sql, new { Token = token });
        }

        public async Task DeleteToken(string token)
        {
            using var conn = _connection.GetConnection();

            var sql = @"DELETE FROM TokenRecuperacaoSenha
                                    WHERE TOKEN = @token;";
            await conn.ExecuteAsync(sql, new { Token = token });
        }
    }
}
