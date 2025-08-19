using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repositories
{
    public class EstadoRepository : IEstadoRepository
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
                string sql = @$"
                    SELECT ID AS {nameof(EstadoEntity.Id)},
                           NOME AS {nameof(EstadoEntity.Nome)},
                           SIGLA AS {nameof(EstadoEntity.Sigla)}
                      FROM ESTADO
                ";
                IEnumerable<EstadoEntity> estadoList = await con.QueryAsync<EstadoEntity>(sql);
                return estadoList;
            }
        }

        public async Task Insert(EstadoInsertDTO estado)
        {
            string sql = @$"
                INSERT INTO ESTADO (NOME, SIGLA)
                             VALUES (@Nome, @Sigla)
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
                string sql = @$"
                    SELECT ID AS {nameof(EstadoEntity.Id)},
                           NOME AS {nameof(EstadoEntity.Nome)},
                           SIGLA AS {nameof(EstadoEntity.Sigla)}
                      FROM ESTADO
                     WHERE ID = @id
                ";
                EstadoEntity estado = await con.QueryFirstAsync<EstadoEntity>(sql, new { id });
                return estado;
            }
        }

        public async Task Update(EstadoEntity estado)
        {
            string sql = @$"
                UPDATE ESTADO
                   SET NOME = @Nome,
                       SIGLA = @Sigla
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, estado);
        }
    }
}