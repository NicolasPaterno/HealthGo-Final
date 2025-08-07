using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class QuartoRepository : IQuartoRepository
    {
        private IConnection _connection;

        public QuartoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<QuartoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(QuartoEntity.Id)},
                           NUMERO AS {nameof(QuartoEntity.Numero)},
                           ANDAR AS {nameof(QuartoEntity.Andar)},
                           ACEITAANIMAL AS {nameof(QuartoEntity.AceitaAnimal)},
                           OBSERVACAO AS {nameof(QuartoEntity.Observacao)},
                           PRECO AS {nameof(QuartoEntity.Preco)},
                           LIMITEPESSOA AS {nameof(QuartoEntity.LimitePessoa)},
                           HOTEL_ID AS {nameof(QuartoEntity.Hotel_Id)}
                      FROM QUARTO
                ";
                IEnumerable<QuartoEntity> quartoList = await con.QueryAsync<QuartoEntity>(sql);
                return quartoList;
            }
        }

        public async Task Insert(QuartoInsertDTO quarto)
        {
            string sql = @$"
                INSERT INTO QUARTO (NUMERO, ANDAR, ACEITAANIMAL, OBSERVACAO, PRECO, LIMITEPESSOA, HOTEL_ID)
                             VALUES (@Numero, @Andar, @AceitaAnimal, @Observacao, @Preco, @LimitePessoa, @Hotel_Id)
            ";
            await _connection.Execute(sql, quarto);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM QUARTO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<QuartoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(QuartoEntity.Id)},
                           NUMERO AS {nameof(QuartoEntity.Numero)},
                           ANDAR AS {nameof(QuartoEntity.Andar)},
                           ACEITAANIMAL AS {nameof(QuartoEntity.AceitaAnimal)},
                           OBSERVACAO AS {nameof(QuartoEntity.Observacao)},
                           PRECO AS {nameof(QuartoEntity.Preco)},
                           LIMITEPESSOA AS {nameof(QuartoEntity.LimitePessoa)},
                           HOTEL_ID AS {nameof(QuartoEntity.Hotel_Id)}
                      FROM QUARTO
                     WHERE ID = @id
                ";
                QuartoEntity quarto = await con.QueryFirstAsync<QuartoEntity>(sql, new { id });
                return quarto;
            }
        }

        public async Task<IEnumerable<QuartoEntity>> GetByHotelId(int hotelId)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(QuartoEntity.Id)},
                           NUMERO AS {nameof(QuartoEntity.Numero)},
                           ANDAR AS {nameof(QuartoEntity.Andar)},
                           ACEITAANIMAL AS {nameof(QuartoEntity.AceitaAnimal)},
                           OBSERVACAO AS {nameof(QuartoEntity.Observacao)},
                           PRECO AS {nameof(QuartoEntity.Preco)},
                           LIMITEPESSOA AS {nameof(QuartoEntity.LimitePessoa)},
                           HOTEL_ID AS {nameof(QuartoEntity.Hotel_Id)}
                      FROM QUARTO
                     WHERE HOTEL_ID = @hotelId
                     ORDER BY NUMERO
                ";
                IEnumerable<QuartoEntity> quartoList = await con.QueryAsync<QuartoEntity>(sql, new { hotelId });
                return quartoList;
            }
        }

        public async Task Update(QuartoEntity quarto)
        {
            string sql = @$"
                UPDATE QUARTO
                   SET NUMERO = @Numero,
                       ANDAR = @Andar,
                       ACEITAANIMAL = @AceitaAnimal,
                       OBSERVACAO = @Observacao,
                       PRECO = @Preco,
                       LIMITEPESSOA = @LimitePessoa,
                       HOTEL_ID = @Hotel_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, quarto);
        }
    }
}