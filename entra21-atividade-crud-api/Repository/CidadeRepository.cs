using Dapper;
using entra21_atividade_crud_api.Contracts.Infrastructure;
using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using MySql.Data.MySqlClient;

namespace entra21_atividade_crud_api.Repository
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
                     SELECT ID AS {nameof(CidadeEntity.id)},
                            NOME AS {nameof(CidadeEntity.Nome)},
                           ESTADO_ID {nameof(CidadeEntity.Estado_id)}
                       FROM CIDADE
                ";
                IEnumerable<CidadeEntity> cidadeList = await con.QueryAsync<CidadeEntity>(sql);
                return cidadeList;
            }
        }

        public async Task Insert(CidadeInsertDTO cidade)
        {
            string sql = @$"
                INSERT INTO CIDADE (NOME,ESTADO_ID)
                                VALUES (@Nome,@ESTADO_ID)                                                         
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
                            SELECT ID AS {nameof(CidadeEntity.id)},
                            NOME AS {nameof(CidadeEntity.Nome)},
                           ESTADO_ID {nameof(CidadeEntity.Estado_id)}
                       FROM CIDADE
                         WHERE ID = @Id
                              
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
                               ESTADO_ID = @Estado_id
                               WHERE ID = @Id;
                          ";
            await _connection.Execute(sql, cidade);
        }
    }
}