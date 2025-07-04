using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class CidadeRepository : ICidadeRepository
    {
        private IConnection _connection;

        public CidadeRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<CidadeEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(CidadeEntity.Id)},
                           NOME AS {nameof(CidadeEntity.Nome)},
                           ESTADO_ID AS {nameof(CidadeEntity.Estado_Id)}
                      FROM CIDADE
                ";
                IEnumerable<CidadeEntity> cidadeList = await con.QueryAsync<CidadeEntity>(sql);
                return cidadeList;
            }
        }

        public async Task Insert(CidadeInsertDTO cidade)
        {
            string sql = @$"
                INSERT INTO CIDADE (NOME, ESTADO_ID)
                             VALUES (@Nome, @Estado_Id)
            ";
            await _connection.Execute(sql, cidade);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM CIDADE WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<CidadeEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(CidadeEntity.Id)},
                           NOME AS {nameof(CidadeEntity.Nome)},
                           ESTADO_ID AS {nameof(CidadeEntity.Estado_Id)}
                      FROM CIDADE
                     WHERE ID = @id
                ";
                CidadeEntity cidade = await con.QueryFirstAsync<CidadeEntity>(sql, new { id });
                return cidade;
            }
        }

        public async Task Update(CidadeEntity cidade)
        {
            string sql = @$"
                UPDATE CIDADE
                   SET NOME = @Nome,
                       ESTADO_ID = @Estado_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, cidade);
        }
    }
}