using Dapper;
using MySql.Data.MySqlClient;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Contracts.Repositories;

namespace API_HealthGo.Repository
{
    class PassagemRepository : IPassagemRepository
    {
        private IConnection _connection;

        public PassagemRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<PassagemEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                       SELECT ID AS {nameof(PassagemEntity.Id)},
                        VOO_ID AS {nameof(PassagemEntity.Voo_Id)},
                        ORDEMSERVICO_ID AS {nameof(PassagemEntity.OrdemServico_Id)}
                        FROM PASSAGEM
                ";

                IEnumerable<PassagemEntity> passagemList = await con.QueryAsync<PassagemEntity>(sql);
                return passagemList;
            }
        }

        public async Task<PassagemEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(VooEntity.Id)},
                        SELECT ID AS {nameof(PassagemEntity.Id)},
                        VOO_ID AS {nameof(PassagemEntity.Voo_Id)},
                        ORDEMSERVICO_ID AS {nameof(PassagemEntity.OrdemServico_Id)}
                        FROM PASSAGEM
                        WHERE ID = @id
                ";

                PassagemEntity passagem = await con.QueryFirstAsync<PassagemEntity>(sql, new { id });
                return passagem;
            }
        }

        public async Task Insert(PassagemInsertDTO passagem)
        {
            string sql = @"
                INSERT INTO PASSAGEM (VOO_ID, ORDEMSERVICO_ID)
                    VALUES (@Voo_Id, @OrdemServico_Id)
            ";

            await _connection.Execute(sql, passagem);
        }

        public async Task Update(PassagemEntity passagem)
        {
            string sql = @"
                UPDATE PASSAGEM
                    SET VOO_ID = @Voo_Id,
                        ORDEMSERVICO_ID = @OrdemServico_Id
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, passagem);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM PASSAGEM WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

    }
}