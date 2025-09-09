namespace API_HealthGo.Repositories
{
    using Dapper;
    using global::API_HealthGo.Contracts.Infrastructure;
    using global::API_HealthGo.Contracts.Repositories;
    using global::API_HealthGo.Contracts.Repository;
    using global::API_HealthGo.DTO;
    using global::API_HealthGo.Entities;
    using MySql.Data.MySqlClient;

    namespace API_HealthGo.Repositories
    {
        public class OrdemServico_HotelRepository : IOrdemServico_HotelRepository
        {
            private readonly IConnection _connection;

            public OrdemServico_HotelRepository(IConnection connection)
            {
                _connection = connection;
            }

            public async Task<IEnumerable<OrdemServico_HotelEntity>> GetAll()
            {
                using (MySqlConnection con = _connection.GetConnection())
                {
                    string sql = @$"
                    SELECT 
                        Id AS {nameof(OrdemServico_HotelEntity.Id)},
                        DataEntrada AS {nameof(OrdemServico_HotelEntity.DataEntrada)},
                        DataSaida AS {nameof(OrdemServico_HotelEntity.DataSaida)},
                        OrdemServico_Id AS {nameof(OrdemServico_HotelEntity.OrdemServico_Id)},
                        Hotel_Id AS {nameof(OrdemServico_HotelEntity.Hotel_Id)}
                    FROM OrdemServico_Hotel";

                    IEnumerable<OrdemServico_HotelEntity> list = await con.QueryAsync<OrdemServico_HotelEntity>(sql);
                    return list;
                }
            }

            public async Task<OrdemServico_HotelEntity> GetById(int id)
            {
                using (MySqlConnection con = _connection.GetConnection())
                {
                    string sql = @$"
                    SELECT 
                        Id AS {nameof(OrdemServico_HotelEntity.Id)},
                        DataEntrada AS {nameof(OrdemServico_HotelEntity.DataEntrada)},
                        DataSaida AS {nameof(OrdemServico_HotelEntity.DataSaida)},
                        OrdemServico_Id AS {nameof(OrdemServico_HotelEntity.OrdemServico_Id)},
                        Hotel_Id AS {nameof(OrdemServico_HotelEntity.Hotel_Id)}
                    FROM OrdemServico_Hotel
                    WHERE Id = @id";

                    OrdemServico_HotelEntity entity = await con.QueryFirstOrDefaultAsync<OrdemServico_HotelEntity>(sql, new { id });
                    return entity;
                }
            }

            public async Task Insert(OrdemServico_HotelInsertDTO ordemServico_Hotel)
            {
                string sql = @$"
                INSERT INTO OrdemServico_Hotel (DataEntrada, DataSaida, OrdemServico_Id, Hotel_Id)
                VALUES (@DataEntrada, @DataSaida, @OrdemServico_Id, @Hotel_Id)";

                using (MySqlConnection con = _connection.GetConnection())
                {
                    await con.ExecuteAsync(sql, ordemServico_Hotel);
                }
            }

            public async Task Delete(int id)
            {
                string sql = "DELETE FROM OrdemServico_Hotel WHERE Id = @id";
                using (MySqlConnection con = _connection.GetConnection())
                {
                    await con.ExecuteAsync(sql, new { id });
                }
            }

            public async Task Update(OrdemServico_HotelEntity ordemServico_Hotel)
            {
                string sql = @$"
                UPDATE OrdemServico_Hotel
                SET 
                    DataEntrada = @DataEntrada,
                    DataSaida = @DataSaida,
                    OrdemServico_Id = @OrdemServico_Id,
                    Hotel_Id = @Hotel_Id
                WHERE Id = @Id";

                using (MySqlConnection con = _connection.GetConnection())
                {
                    await con.ExecuteAsync(sql, ordemServico_Hotel);
                }
            }
        }
    }
}