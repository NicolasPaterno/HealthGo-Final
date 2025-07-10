using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class CamaQuartoRepository : ICamaQuartoRepository
    {
        private IConnection _connection;

        public CamaQuartoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<CamaQuartoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(CamaQuartoEntity.Id)},
                           QUANTIDADE AS {nameof(CamaQuartoEntity.Quantidade)},
                           TIPOCAMA AS {nameof(CamaQuartoEntity.TipoCama)},
                           QUARTO_ID AS {nameof(CamaQuartoEntity.Quarto_Id)}
                      FROM CAMAQUARTO
                ";
                IEnumerable<CamaQuartoEntity> camaQuartoList = await con.QueryAsync<CamaQuartoEntity>(sql);
                return camaQuartoList;
            }
        }

        public async Task Insert(CamaQuartoInsertDTO camaQuarto)
        {
            string sql = @$"
                INSERT INTO CAMAQUARTO (QUANTIDADE, TIPOCAMA, QUARTO_ID)
                             VALUES (@Quantidade, @TipoCama, @Quarto_Id)
            ";
            await _connection.Execute(sql, camaQuarto);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM CAMAQUARTO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<CamaQuartoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(CamaQuartoEntity.Id)},
                           QUANTIDADE AS {nameof(CamaQuartoEntity.Quantidade)},
                           TIPOCAMA AS {nameof(CamaQuartoEntity.TipoCama)},
                           QUARTO_ID AS {nameof(CamaQuartoEntity.Quarto_Id)}
                      FROM CAMAQUARTO
                     WHERE ID = @id
                ";
                CamaQuartoEntity camaQuarto = await con.QueryFirstAsync<CamaQuartoEntity>(sql, new { id });
                return camaQuarto;
            }
        }

        public async Task Update(CamaQuartoEntity camaQuarto)
        {
            string sql = @$"
                UPDATE CAMAQUARTO
                   SET QUANTIDADE = @Quantidade,
                       TIPOCAMA = @TipoCama,
                       QUARTO_ID = @Quarto_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, camaQuarto);
        }
    }
}