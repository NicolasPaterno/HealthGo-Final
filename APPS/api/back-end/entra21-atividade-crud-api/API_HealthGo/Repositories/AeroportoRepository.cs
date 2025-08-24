using Dapper;
using MySql.Data.MySqlClient;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.DTO;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;

namespace API_HealthGo.Repository
{
    class AeroportoRepository : IAeroportoRepository
    {

        private IConnection _connection;

        public AeroportoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<AeroportoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                     SELECT ID AS {nameof(AeroportoEntity.Id)},
                            NOME AS {nameof(AeroportoEntity.Nome)},
                            CODIGO AS {nameof(AeroportoEntity.Codigo)},
                           CIDADE_ID AS {nameof(AeroportoEntity.Cidade_Id)}
                       FROM AEROPORTO
                ";
                IEnumerable<AeroportoEntity> aeroportoList = await con.QueryAsync<AeroportoEntity>(sql);
                return aeroportoList;
            }
        }


        public async Task Insert(AeroportoInsertDTO aeroporto)
        {
            string sql = @$"
                INSERT INTO AEROPORTO (NOME,CODIGO,CIDADE_ID)
                                VALUES (@Nome,@Codigo, @Cidade_ID)                                                         
            ";
            await _connection.Execute(sql, aeroporto);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM AEROPORTO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<AeroportoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                            SELECT ID AS {nameof(AeroportoEntity.Id)},
                            NOME AS {nameof(AeroportoEntity.Nome)},
                            CODIGO AS {nameof(AeroportoEntity.Codigo)},
                            CIDADE_ID AS {nameof(AeroportoEntity.Cidade_Id)}
                       FROM AEROPORTO
                       WHERE ID = @Id
                              
                            ";
                AeroportoEntity aeroporto = await con.QueryFirstAsync<AeroportoEntity>(sql, new { id });
                return aeroporto;
            }
        }

        public async Task Update(AeroportoEntity aeroporto)
        {
            string sql = @$"
                      UPDATE AEROPORTO
                               SET NOME = @Nome,
                               CODIGO = @Codigo,
                               CIDADE_ID = @Cidade_Id
                               WHERE ID = @Id;
                          ";
            await _connection.Execute(sql, aeroporto);
        }
    }
}