using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class NacaoRepository : INacaoRepository
    {
        private IConnection _connection;

        public NacaoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<NacaoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(NacaoEntity.Id)},
                           NOME AS {nameof(NacaoEntity.Nome)}
                      FROM NACAO
                ";
                IEnumerable<NacaoEntity> nacaoList = await con.QueryAsync<NacaoEntity>(sql);
                return nacaoList;
            }
        }

        public async Task Insert(NacaoInsertDTO nacao)
        {
            string sql = @$"
                INSERT INTO NACAO (NOME)
                             VALUES (@Nome)
            ";
            await _connection.Execute(sql, nacao);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM NACAO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<NacaoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(NacaoEntity.Id)},
                           NOME AS {nameof(NacaoEntity.Nome)}
                      FROM NACAO
                     WHERE ID = @id
                ";
                NacaoEntity nacao = await con.QueryFirstAsync<NacaoEntity>(sql, new { id });
                return nacao;
            }
        }

        public async Task Update(NacaoEntity nacao)
        {
            string sql = @$"
                UPDATE NACAO
                   SET NOME = @Nome
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, nacao);
        }
    }
}
