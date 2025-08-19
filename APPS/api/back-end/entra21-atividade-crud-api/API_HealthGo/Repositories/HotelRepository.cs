using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
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
                        c.ID AS CidadeId,
                        c.NOME AS CidadeNome,
                        c.ESTADO_ID AS CidadeEstadoId,
                        e.ID AS EstadoId,
                        e.NOME AS EstadoNome,
                        e.SIGLA AS EstadoSigla
                    FROM HOTEL h
                    LEFT JOIN CIDADE c ON h.CIDADE_ID = c.ID
                    LEFT JOIN ESTADO e ON c.ESTADO_ID = e.ID
                    WHERE h.ATIVO = 1
                ";

                var hotels = await con.QueryAsync<HotelWithLocationDTO>(sql);
                var result = new List<HotelEntity>();

                foreach (var hotelDto in hotels)
                {
                    var hotel = new HotelEntity
                    {
                        Id = hotelDto.Id,
                        CNPJ = hotelDto.CNPJ,
                        Nome = hotelDto.Nome,
                        Tipo = hotelDto.Tipo,
                        Email = hotelDto.Email,
                        Telefone = hotelDto.Telefone,
                        Site = hotelDto.Site,
                        Acessibilidade = hotelDto.Acessibilidade,
                        CEP = hotelDto.CEP,
                        Bairro = hotelDto.Bairro,
                        Rua = hotelDto.Rua,
                        NumeroEndereco = hotelDto.NumeroEndereco,
                        Descricao = hotelDto.Descricao,
                        Ativo = hotelDto.Ativo,
                        DataInicio = hotelDto.DataInicio,
                        Cidade_Id = hotelDto.Cidade_Id,
                        Pessoa_Id = hotelDto.Pessoa_Id,
                        Cidade = new CidadeEntity
                        {
                            Id = hotelDto.CidadeId,
                            Nome = hotelDto.CidadeNome,
                            Estado_Id = hotelDto.CidadeEstadoId,
                            Estado = new EstadoEntity
                            {
                                Id = hotelDto.EstadoId,
                                Nome = hotelDto.EstadoNome,
                                Sigla = hotelDto.EstadoSigla
                            }
                        }
                    };
                    result.Add(hotel);
                }

                return result;
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
                        c.ID AS CidadeId,
                        c.NOME AS CidadeNome,
                        c.ESTADO_ID AS CidadeEstadoId,
                        e.ID AS EstadoId,
                        e.NOME AS EstadoNome,
                        e.SIGLA AS EstadoSigla
                    FROM HOTEL h
                    LEFT JOIN CIDADE c ON h.CIDADE_ID = c.ID
                    LEFT JOIN ESTADO e ON c.ESTADO_ID = e.ID
                    WHERE h.ID = @id
                ";

                var hotelDto = await con.QueryFirstOrDefaultAsync<HotelWithLocationDTO>(sql, new { id });
                
                if (hotelDto == null) return null;

                var hotel = new HotelEntity
                {
                    Id = hotelDto.Id,
                    CNPJ = hotelDto.CNPJ,
                    Nome = hotelDto.Nome,
                    Tipo = hotelDto.Tipo,
                    Email = hotelDto.Email,
                    Telefone = hotelDto.Telefone,
                    Site = hotelDto.Site,
                    Acessibilidade = hotelDto.Acessibilidade,
                    CEP = hotelDto.CEP,
                    Bairro = hotelDto.Bairro,
                    Rua = hotelDto.Rua,
                    NumeroEndereco = hotelDto.NumeroEndereco,
                    Descricao = hotelDto.Descricao,
                    Ativo = hotelDto.Ativo,
                    DataInicio = hotelDto.DataInicio,
                    Cidade_Id = hotelDto.Cidade_Id,
                    Pessoa_Id = hotelDto.Pessoa_Id,
                    Cidade = new CidadeEntity
                    {
                        Id = hotelDto.CidadeId,
                        Nome = hotelDto.CidadeNome,
                        Estado_Id = hotelDto.CidadeEstadoId,
                        Estado = new EstadoEntity
                        {
                            Id = hotelDto.EstadoId,
                            Nome = hotelDto.EstadoNome,
                            Sigla = hotelDto.EstadoSigla
                        }
                    }
                };

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
                        c.ID AS CidadeId,
                        c.NOME AS CidadeNome,
                        c.ESTADO_ID AS CidadeEstadoId,
                        e.ID AS EstadoId,
                        e.NOME AS EstadoNome,
                        e.SIGLA AS EstadoSigla
                    FROM HOTEL h
                    LEFT JOIN CIDADE c ON h.CIDADE_ID = c.ID
                    LEFT JOIN ESTADO e ON c.ESTADO_ID = e.ID
                    WHERE h.PESSOA_ID = @pessoaId
                ";

                var hotels = await con.QueryAsync<HotelWithLocationDTO>(sql, new { pessoaId });
                var result = new List<HotelEntity>();

                foreach (var hotelDto in hotels)
                {
                    var hotel = new HotelEntity
                    {
                        Id = hotelDto.Id,
                        CNPJ = hotelDto.CNPJ,
                        Nome = hotelDto.Nome,
                        Tipo = hotelDto.Tipo,
                        Email = hotelDto.Email,
                        Telefone = hotelDto.Telefone,
                        Site = hotelDto.Site,
                        Acessibilidade = hotelDto.Acessibilidade,
                        CEP = hotelDto.CEP,
                        Bairro = hotelDto.Bairro,
                        Rua = hotelDto.Rua,
                        NumeroEndereco = hotelDto.NumeroEndereco,
                        Descricao = hotelDto.Descricao,
                        Ativo = hotelDto.Ativo,
                        DataInicio = hotelDto.DataInicio,
                        Cidade_Id = hotelDto.Cidade_Id,
                        Pessoa_Id = hotelDto.Pessoa_Id,
                        Cidade = new CidadeEntity
                        {
                            Id = hotelDto.CidadeId,
                            Nome = hotelDto.CidadeNome,
                            Estado_Id = hotelDto.CidadeEstadoId,
                            Estado = new EstadoEntity
                            {
                                Id = hotelDto.EstadoId,
                                Nome = hotelDto.EstadoNome,
                                Sigla = hotelDto.EstadoSigla
                            }
                        }
                    };
                    result.Add(hotel);
                }

                return result;
            }
        }
    }
}