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
                        PRECO AS {nameof(PassagemEntity.Preco)},
                        CLASSE AS {nameof(PassagemEntity.Classe)},
                        VOO_ID AS {nameof(PassagemEntity.Voo_Id)},
                        PESSOA_ID AS {nameof(PassagemEntity.Pessoa_Id)}
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
                    SELECT ID AS {nameof(PassagemEntity.Id)},
                        PRECO AS {nameof(PassagemEntity.Preco)},
                        CLASSE AS {nameof(PassagemEntity.Classe)},
                        VOO_ID AS {nameof(PassagemEntity.Voo_Id)},
                        PESSOA_ID AS {nameof(PassagemEntity.Pessoa_Id)}
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
                INSERT INTO PASSAGEM (PRECO, CLASSE, VOO_ID, PESSOA_ID)
                    VALUES (@Preco, @Classe, @Voo_Id, @Pessoa_Id)
            ";

            await _connection.Execute(sql, passagem);
        }

        public async Task Update(PassagemEntity passagem)
        {
            string sql = @"
                UPDATE PASSAGEM
                    SET PRECO = @Preco,
                        CLASSE = @Classe,
                        VOO_ID = @Voo_Id,
                        PESSOA_ID = @Pessoa_Id
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