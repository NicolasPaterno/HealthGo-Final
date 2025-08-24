using Dapper;
using MySql.Data.MySqlClient;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Contracts.Repositories;

namespace API_HealthGo.Repository
{
    class VooRepository : IVooRepository
    {
        private IConnection _connection;

        public VooRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<VooEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                       SELECT ID AS {nameof(VooEntity.Id)},
                        NUMERO AS {nameof(VooEntity.Numero)},
                        DATAPARTIDA AS {nameof(VooEntity.DataPartida)},
                        DATACHEGADA AS {nameof(VooEntity.DataChegada)},
                        AEROPORTOORIGEM_ID AS {nameof(VooEntity.AeroportoOrigem_Id)},
                        AEROPORTODESTINO_ID AS {nameof(VooEntity.AeroportoDestino_Id)},
                        AVIAO_ID AS {nameof(VooEntity.Aviao_Id)}
                        FROM VOO
                ";

                IEnumerable<VooEntity> vooList = await con.QueryAsync<VooEntity>(sql);
                return vooList;
            }
        }

        public async Task<VooEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(VooEntity.Id)},
                        NUMERO AS {nameof(VooEntity.Numero)},
                        DATAPARTIDA AS {nameof(VooEntity.DataPartida)},
                        DATACHEGADA AS {nameof(VooEntity.DataChegada)},
                        AEROPORTOORIGEM_ID AS {nameof(VooEntity.AeroportoOrigem_Id)},
                        AEROPORTODESTINO_ID AS {nameof(VooEntity.AeroportoDestino_Id)},
                        AVIAO_ID AS {nameof(VooEntity.Aviao_Id)}
                        FROM VOO
                        WHERE ID = @id
                ";

                VooEntity voo = await con.QueryFirstAsync<VooEntity>(sql, new { id });
                return voo;
            }
        }

        public async Task Insert(VooInsertDTO assento)
        {
            string sql = @"
                INSERT INTO VOO (NUMERO, DATAPARTIDA, DATACHEGADA, AEROPORTOORIGEM_ID, AEROPORTODESTINO_ID, AVIAO_ID)
                    VALUES (@Numero, @DataPartida, @DataChegada, @AeroportoOrigem_Id, @AeroportoDestino_Id, @Aviao_Id)
            ";

            await _connection.Execute(sql, assento);
        }

        public async Task Update(VooEntity voo)
        {
            string sql = @"
                UPDATE VOO
                    SET NUMERO = @Numero,
                        DATAPARTIDA = @DataPartida,
                        DATACHEGADA = @DataChegada,
                        AEROPORTOORIGEM_ID = @AeroportoOrigem_Id,
                        AEROPORTODESTINO_ID = @AeroportoDestino_Id,
                        AVIAO_ID = @Aviao_Id
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, voo);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM VOO WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

    }
}

