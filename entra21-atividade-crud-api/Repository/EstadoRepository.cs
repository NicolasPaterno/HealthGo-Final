using Dapper;
using MinhaPrimeiraApi.Contracts.Connection;
using MinhaPrimeiraApi.Contracts.Repository;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MySql.Data.MySqlClient;

namespace MinhaPrimeiraApi.Repository
{
    class EstadoRepository : IEstadoRepository
    {

        private IConnection _connection;

        public EstadoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<EstadoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT Id AS {nameof(EstadoEntity.id)},
                           Nome AS {nameof(EstadoEntity.Nome)},
                           Sigla AS {nameof(EstadoEntity.Sigla)},
                          NACAO_ID AS {nameof(EstadoEntity.Nacao_id)}
                      FROM ESTADO
                ";

                IEnumerable<EstadoEntity> estadoList = await con.QueryAsync<EstadoEntity>(sql);

                return estadoList;
            }
        }

        public async Task Insert(EstadoInsertDTO estado)
        {
            string sql = @"
                INSERT INTO ESTADO (NOME,SIGLA,NACAO_ID)
                                VALUES (@Nome,@SIGLA,@NACAO_ID)
                ";

            await _connection.Execute(sql, estado);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM ESTADO WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

        public async Task<EstadoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT Id AS {nameof(EstadoEntity.id)},
                           Nome AS {nameof(EstadoEntity.Nome)},
                           Sigla AS {nameof(EstadoEntity.Sigla)},
                          NACAO_ID AS {nameof(EstadoEntity.Nacao_id)}
                      FROM ESTADO
                   WHERE ID = @Id;
                ";

                EstadoEntity estado = await con.QueryFirstAsync<EstadoEntity>(sql, new { id });
                return estado;
            }
        }

        public async Task Update(EstadoEntity estado)
        {
            string sql = @"
                          UPDATE ESTADO
                               SET NOME = @Nome,
                                  SIGLA = @Sigla,
                               NACAO_ID = @Nacao_id
                               WHERE ID = @Id;
                    ";

            await _connection.Execute(sql, estado);
        }
    }
}