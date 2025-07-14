using Dapper;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    public class HotelRepository : IHotelRepository
    {
        private IConnection _connection;

        public HotelRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<HotelEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT Id, CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, Ativo, DataInicio, DataFim, Cidade_Id
                    FROM HOTEL
                ";

                IEnumerable<HotelEntity> hotelList = await con.QueryAsync<HotelEntity>(sql);
                return hotelList;
            }
        }

        public async Task<HotelEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT Id, CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, Ativo, DataInicio, DataFim, Cidade_Id
                    FROM HOTEL
                    WHERE Id = @id
                ";

                HotelEntity hotel = await con.QueryFirstOrDefaultAsync<HotelEntity>(sql, new { id });
                return hotel;
            }
        }

        public async Task Insert(HotelInsertDTO hotel)
        {
            string sql = @"
                INSERT INTO HOTEL (
                    CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, Ativo, DataInicio, DataFim, Cidade_Id
                )
                VALUES (
                    @CNPJ, @Nome, @Tipo, @Email, @Telefone, @Site, @Acessibilidade, @CEP, @Bairro, @Rua, @NumeroEndereco, @Descricao, @Ativo, @DataInicio, @DataFim, @Cidade_Id
                )
            ";

            await _connection.Execute(sql, hotel);
        }

        public async Task Update(HotelEntity hotel)
        {
            string sql = @"
                UPDATE HOTEL SET
                    CNPJ = @CNPJ,
                    Nome = @Nome,
                    Tipo = @Tipo,
                    Email = @Email,
                    Telefone = @Telefone,
                    Site = @Site,
                    Acessibilidade = @Acessibilidade,
                    CEP = @CEP,
                    Bairro = @Bairro,
                    Rua = @Rua,
                    NumeroEndereco = @NumeroEndereco,
                    Descricao = @Descricao,
                    Ativo = @Ativo,
                    DataInicio = @DataInicio,
                    DataFim = @DataFim,
                    Cidade_Id = @Cidade_Id
                WHERE Id = @Id
            ";

            await _connection.Execute(sql, hotel);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM HOTEL WHERE Id = @id";
            await _connection.Execute(sql, new { id });
        }
    }
}