using Dapper;
using MySql.Data.MySqlClient;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.Entity;
using API_HealthGo.DTO;

namespace API_HealthGo.Repository
{
    internal class AssentoRepository : IAssentoRepository
    {
        private IConnection _connection;

        public AssentoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<AssentoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                       SELECT ID AS {nameof(AssentoEntity.Id)},
                        NUMERO AS {nameof(AssentoEntity.Numero)},
                        TIPO AS {nameof(AssentoEntity.Tipo)},
                        AVIAO_ID AS {nameof(AssentoEntity.Aviao_Id)}
                        FROM ASSENTO
                ";

                IEnumerable<AssentoEntity> assentoList = await con.QueryAsync<AssentoEntity>(sql);
                return assentoList;
            }
        }

        public async Task<AssentoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(AssentoEntity.Id)},
                        NUMERO AS {nameof(AssentoEntity.Numero)},
                        TIPO AS {nameof(AssentoEntity.Tipo)},
                        AVIAO_ID AS {nameof(AssentoEntity.Aviao_Id)}
                        FROM ASSENTO
                        WHERE ID = @id
                ";

                AssentoEntity assento = await con.QueryFirstAsync<AssentoEntity>(sql, new { id });
                return assento;
            }
        }

        public async Task Insert(AssentoInsertDTO assento)
        {
            string sql = @"
                INSERT INTO ASSENTO (NUMERO, TIPO, AVIAO_ID)
                    VALUES (@Numero, @Tipo, @Aviao_Id)
            ";

            await _connection.Execute(sql, assento);
        }

        public async Task Update(AssentoEntity assento)
        {
            string sql = @"
                UPDATE ASSENTO
                    SET NUMERO = @Numero,
                    TIPO = @Tipo,
                    AVIAO_ID = @Aviao_Id
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, assento);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM ASSENTO WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

    }
}
