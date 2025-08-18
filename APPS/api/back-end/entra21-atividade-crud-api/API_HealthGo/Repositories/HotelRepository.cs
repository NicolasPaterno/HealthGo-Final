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
                string sql = @"
                    SELECT 
                        h.ID AS Id,
                        h.CNPJ,
                        h.NOME AS Nome,
                        h.TIPO AS Tipo,
                        h.EMAIL AS Email,
                        h.TELEFONE AS Telefone,
                        h.SITE AS Site,
                        h.ACESSIBILIDADE AS Acessibilidade,
                        h.CEP,
                        h.BAIRRO AS Bairro,
                        h.RUA AS Rua,
                        h.NUMEROENDERECO AS NumeroEndereco,
                        h.DESCRICAO AS Descricao,
                        h.ATIVO AS Ativo,
                        h.DATAINICIO AS DataInicio,
                        h.CIDADE_ID AS Cidade_Id,
                        h.PESSOA_ID AS Pessoa_id,
                        c.ID AS Cidade_Id,
                        c.NOME AS Cidade_Nome,
                        c.ESTADO_ID AS Cidade_Estado_Id,
                        e.ID AS Estado_Id,
                        e.NOME AS Estado_Nome,
                        e.SIGLA AS Estado_Sigla
                    FROM HOTEL h
                    LEFT JOIN CIDADE c ON h.CIDADE_ID = c.ID
                    LEFT JOIN ESTADO e ON c.ESTADO_ID = e.ID
                    WHERE h.ATIVO = 1
                ";

                var hotelDictionary = new Dictionary<int, HotelEntity>();

                await con.QueryAsync<HotelEntity, CidadeEntity, EstadoEntity, HotelEntity>(
                    sql,
                    (hotel, cidade, estado) =>
                    {
                        if (!hotelDictionary.TryGetValue(hotel.Id, out var hotelEntry))
                        {
                            hotelEntry = hotel;
                            hotelDictionary.Add(hotel.Id, hotelEntry);
                        }

                        if (cidade != null)
                        {
                            hotelEntry.Cidade = cidade;
                            if (estado != null)
                            {
                                hotelEntry.Cidade.Estado = estado;
                            }
                        }

                        return hotelEntry;
                    },
                    splitOn: "Cidade_Id,Estado_Id"
                );

                return hotelDictionary.Values;
            }
        }



        public async Task<HotelEntity> GetHotelById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT 
                        h.ID AS Id,
                        h.CNPJ,
                        h.NOME AS Nome,
                        h.TIPO AS Tipo,
                        h.EMAIL AS Email,
                        h.TELEFONE AS Telefone,
                        h.SITE AS Site,
                        h.ACESSIBILIDADE AS Acessibilidade,
                        h.CEP,
                        h.BAIRRO AS Bairro,
                        h.RUA AS Rua,
                        h.NUMEROENDERECO AS NumeroEndereco,
                        h.DESCRICAO AS Descricao,
                        h.ATIVO AS Ativo,
                        h.DATAINICIO AS DataInicio,
                        h.CIDADE_ID AS Cidade_Id,
                        h.PESSOA_ID AS Pessoa_id,
                        c.ID AS Cidade_Id,
                        c.NOME AS Cidade_Nome,
                        c.ESTADO_ID AS Cidade_Estado_Id,
                        e.ID AS Estado_Id,
                        e.NOME AS Estado_Nome,
                        e.SIGLA AS Estado_Sigla
                    FROM HOTEL h
                    LEFT JOIN CIDADE c ON h.CIDADE_ID = c.ID
                    LEFT JOIN ESTADO e ON c.ESTADO_ID = e.ID
                    WHERE h.ID = @id
                ";

                var hotelDictionary = new Dictionary<int, HotelEntity>();

                await con.QueryAsync<HotelEntity, CidadeEntity, EstadoEntity, HotelEntity>(
                    sql,
                    (hotel, cidade, estado) =>
                    {
                        if (!hotelDictionary.TryGetValue(hotel.Id, out var hotelEntry))
                        {
                            hotelEntry = hotel;
                            hotelDictionary.Add(hotel.Id, hotelEntry);
                        }

                        if (cidade != null)
                        {
                            hotelEntry.Cidade = cidade;
                            if (estado != null)
                            {
                                hotelEntry.Cidade.Estado = estado;
                            }
                        }

                        return hotelEntry;
                    },
                    new { id },
                    splitOn: "Cidade_Id,Estado_Id"
                );

                return hotelDictionary.Values.FirstOrDefault();
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
                            PESSOA_ID = @Pessoa_id
                       WHERE ID = @Id
                ";

            await _connection.Execute(sql, hotel);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM HOTEL WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<IEnumerable<HotelEntity>> GetHotelsByPessoaId(int pessoaId)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT 
                        h.ID AS Id,
                        h.CNPJ,
                        h.NOME AS Nome,
                        h.TIPO AS Tipo,
                        h.EMAIL AS Email,
                        h.TELEFONE AS Telefone,
                        h.SITE AS Site,
                        h.ACESSIBILIDADE AS Acessibilidade,
                        h.CEP,
                        h.BAIRRO AS Bairro,
                        h.RUA AS Rua,
                        h.NUMEROENDERECO AS NumeroEndereco,
                        h.DESCRICAO AS Descricao,
                        h.ATIVO AS Ativo,
                        h.DATAINICIO AS DataInicio,
                        h.CIDADE_ID AS Cidade_Id,
                        h.PESSOA_ID AS Pessoa_id,
                        c.ID AS Cidade_Id,
                        c.NOME AS Cidade_Nome,
                        c.ESTADO_ID AS Cidade_Estado_Id,
                        e.ID AS Estado_Id,
                        e.NOME AS Estado_Nome,
                        e.SIGLA AS Estado_Sigla
                    FROM HOTEL h
                    LEFT JOIN CIDADE c ON h.CIDADE_ID = c.ID
                    LEFT JOIN ESTADO e ON c.ESTADO_ID = e.ID
                    WHERE h.PESSOA_ID = @pessoaId
                ";

                var hotelDictionary = new Dictionary<int, HotelEntity>();

                await con.QueryAsync<HotelEntity, CidadeEntity, EstadoEntity, HotelEntity>(
                    sql,
                    (hotel, cidade, estado) =>
                    {
                        if (!hotelDictionary.TryGetValue(hotel.Id, out var hotelEntry))
                        {
                            hotelEntry = hotel;
                            hotelDictionary.Add(hotel.Id, hotelEntry);
                        }

                        if (cidade != null)
                        {
                            hotelEntry.Cidade = cidade;
                            if (estado != null)
                            {
                                hotelEntry.Cidade.Estado = estado;
                            }
                        }

                        return hotelEntry;
                    },
                    new { pessoaId },
                    splitOn: "Cidade_Id,Estado_Id"
                );

                return hotelDictionary.Values;
            }
        }
    }
}