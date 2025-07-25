using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;
using static System.Net.Mime.MediaTypeNames;

namespace API_HealthGo.Repositories
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
                string sql = $@"
                         SELECT ID AS {nameof(HotelEntity.Id)},
                                CNPJ AS {nameof(HotelEntity.CNPJ)},
                                NOME AS {nameof(HotelEntity.Nome)},
                                TIPO AS {nameof(HotelEntity.Tipo)},
                                EMAIL AS {nameof(HotelEntity.Email)},
                                TELEFONE AS {nameof(HotelEntity.Telefone)},
                                SITE AS {nameof(HotelEntity.Site)},
                                ACESSIBILIDADE AS {nameof(HotelEntity.Acessibilidade)},
                                CEP AS {nameof(HotelEntity.CEP)},
                                BAIRRO AS {nameof(HotelEntity.Bairro)},
                                RUA AS {nameof(HotelEntity.Rua)},
                                NUMEROENDERECO AS {nameof(HotelEntity.NumeroEndereco)},
                                DESCRICAO AS {nameof(HotelEntity.Descricao)},
                                ATIVO AS {nameof(HotelEntity.Ativo)},
                                DATAINICIO AS {nameof(HotelEntity.DataInicio)},
                                CIDADE_ID AS {nameof(HotelEntity.Cidade_Id)},
                                PESSOA_ID AS {nameof(HotelEntity.Pessoa_id)}
                         FROM HOTEL
                ";

                IEnumerable<HotelEntity> hotelList = await con.QueryAsync<HotelEntity>(sql);
                return hotelList;
            }
        }

        public async Task<HotelEntity> GetHotelById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                         SELECT ID AS {nameof(HotelEntity.Id)},
                                CNPJ AS {nameof(HotelEntity.CNPJ)},
                                NOME AS {nameof(HotelEntity.Nome)},
                                TIPO AS {nameof(HotelEntity.Tipo)},
                                EMAIL AS {nameof(HotelEntity.Email)},
                                TELEFONE AS {nameof(HotelEntity.Telefone)},
                                SITE AS {nameof(HotelEntity.Site)},
                                ACESSIBILIDADE AS {nameof(HotelEntity.Acessibilidade)},
                                CEP AS {nameof(HotelEntity.CEP)},
                                BAIRRO AS {nameof(HotelEntity.Bairro)},
                                RUA AS {nameof(HotelEntity.Rua)},
                                NUMEROENDERECO AS {nameof(HotelEntity.NumeroEndereco)},
                                DESCRICAO AS {nameof(HotelEntity.Descricao)},
                                ATIVO AS {nameof(HotelEntity.Ativo)},
                                DATAINICIO AS {nameof(HotelEntity.DataInicio)},
                                CIDADE_ID AS {nameof(HotelEntity.Cidade_Id)},
                                CONTAGERENCIA_ID AS {nameof(HotelEntity.Pessoa_id)}
                         FROM HOTEL
                         WHERE ID = @id
                ";

                HotelEntity hotel = await con.QueryFirstAsync<HotelEntity>(sql, new { id });
                return hotel;
            }
        }

        public async Task Insert(HotelInsertDTO hotel)
        {
            try
            {
                string sql = @"
            INSERT INTO HOTEL (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, 
                       Descricao, Ativo, DataInicio, Cidade_Id, Pessoa_Id) 
            VALUES (@CNPJ, @Nome, @Tipo, @Email, @Telefone, @Site, @Acessibilidade, @CEP, @Bairro, @Rua, @NumeroEndereco, 
                       @Descricao, @Ativo, @DataInicio, @Cidade_Id, @Pessoa_Id) 
        ";

                await _connection.Execute(sql, hotel);
            }
            catch (MySqlException ex)
            {
                throw new Exception($"Erro na base de dados ao inserir hotel: {ex.Message}", ex);
            }
        }

        public async Task Update(HotelEntity hotel)
        {
            string sql = $@"
                       UPDATE HOTEL
                         SET 
                            CNPJ = @CNPJ,
                            NOME = @Nome,
                            TIPO = @Tipo,
                            EMAIL = @Email,
                            TELEFONE = @Telefone,
                            SITE = @Site,
                            ACESSIBILIDADE = @Acessibilidade,
                            CEP = @CEP,
                            BAIRRO = @Bairro,
                            RUA = @Rua,
                            NUMEROENDERECO = @NumeroEndereco,
                            DESCRICAO = @Descricao,
                            ATIVO = @Ativo,
                            DATAINICIO = @DataInicio,
                            CIDADE_ID = @Cidade_Id,
                            CONTAGERENCIA_ID = @ContaGerencia_Id
                       WHERE ID = @Id
                ";

            await _connection.Execute(sql, hotel);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM HOTEL WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }
    }
}