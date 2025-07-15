using Dapper;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Infrastructure;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    // Interface para o repositório de Hotéis
    public interface IHotelRepository
    {
        Task<IEnumerable<HotelEntity>> GetAll();
        Task Insert(HotelInsertDTO hotel);
        Task Delete(int id);
        Task<HotelEntity> GetById(int id);
        Task Update(HotelEntity hotel);
    }

    // Entidade Hotel
    public class HotelEntity
    {
        public int Id { get; set; }
        public string CNPJ { get; set; }
        public string Nome { get; set; }
        public string Tipo { get; set; } // Ajustar para o tipo ENUM real se necessário
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Site { get; set; }
        public string Acessibilidade { get; set; }
        public string CEP { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string NumeroEndereco { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public int Cidade_id { get; set; }
    }

    // DTO para inserção de Hotel
    public class HotelInsertDTO
    {
        public string CNPJ { get; set; }
        public string Nome { get; set; }
        public string Tipo { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Site { get; set; }
        public string Acessibilidade { get; set; }
        public string CEP { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string NumeroEndereco { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public int Cidade_id { get; set; }
    }

    class HotelRepository : IHotelRepository
    {
        public async Task<IEnumerable<HotelEntity>> GetAll()
        {
            Connection _connection = new Connection();
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT 
                        Id AS {nameof(HotelEntity.Id)},
                        CNPJ AS {nameof(HotelEntity.CNPJ)},
                        Nome AS {nameof(HotelEntity.Nome)},
                        Tipo AS {nameof(HotelEntity.Tipo)},
                        Email AS {nameof(HotelEntity.Email)},
                        Telefone AS {nameof(HotelEntity.Telefone)},
                        Site AS {nameof(HotelEntity.Site)},
                        Acessibilidade AS {nameof(HotelEntity.Acessibilidade)},
                        CEP AS {nameof(HotelEntity.CEP)},
                        Bairro AS {nameof(HotelEntity.Bairro)},
                        Rua AS {nameof(HotelEntity.Rua)},
                        NumeroEndereco AS {nameof(HotelEntity.NumeroEndereco)},
                        Descricao AS {nameof(HotelEntity.Descricao)},
                        Ativo AS {nameof(HotelEntity.Ativo)},
                        DataInicio AS {nameof(HotelEntity.DataInicio)},
                        DataFim AS {nameof(HotelEntity.DataFim)},
                        Cidade_id AS {nameof(HotelEntity.Cidade_id)}
                    FROM Hotel
                ";

                IEnumerable<HotelEntity> hotelList = await con.QueryAsync<HotelEntity>(sql);

                return hotelList;
            }
        }

        public async Task Insert(HotelInsertDTO hotel)
        {
            Connection _connection = new Connection();
            string sql = @"
                INSERT INTO Hotel (
                    CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, 
                    CEP, Bairro, Rua, NumeroEndereco, Descricao, Ativo, 
                    DataInicio, DataFim, Cidade_id
                )
                VALUES (
                    @CNPJ, @Nome, @Tipo, @Email, @Telefone, @Site, @Acessibilidade, 
                    @CEP, @Bairro, @Rua, @NumeroEndereco, @Descricao, @Ativo, 
                    @DataInicio, @DataFim, @Cidade_id
                )
            ";

            await _connection.Execute(sql, hotel);
        }

        public async Task Delete(int id)
        {
            Connection _connection = new Connection();
            string sql = "DELETE FROM Hotel WHERE Id = @id";

            await _connection.Execute(sql, new { id });
        }

        public async Task<HotelEntity> GetById(int id)
        {
            Connection _connection = new Connection();
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT 
                        Id AS {nameof(HotelEntity.Id)},
                        CNPJ AS {nameof(HotelEntity.CNPJ)},
                        Nome AS {nameof(HotelEntity.Nome)},
                        Tipo AS {nameof(HotelEntity.Tipo)},
                        Email AS {nameof(HotelEntity.Email)},
                        Telefone AS {nameof(HotelEntity.Telefone)},
                        Site AS {nameof(HotelEntity.Site)},
                        Acessibilidade AS {nameof(HotelEntity.Acessibilidade)},
                        CEP AS {nameof(HotelEntity.CEP)},
                        Bairro AS {nameof(HotelEntity.Bairro)},
                        Rua AS {nameof(HotelEntity.Rua)},
                        NumeroEndereco AS {nameof(HotelEntity.NumeroEndereco)},
                        Descricao AS {nameof(HotelEntity.Descricao)},
                        Ativo AS {nameof(HotelEntity.Ativo)},
                        DataInicio AS {nameof(HotelEntity.DataInicio)},
                        DataFim AS {nameof(HotelEntity.DataFim)},
                        Cidade_id AS {nameof(HotelEntity.Cidade_id)}
                    FROM Hotel
                    Where Id = @id
                ";

                HotelEntity hotel = await con.QueryFirstAsync<HotelEntity>(sql, new { id });
                return hotel;
            }
        }

        public async Task Update(HotelEntity hotel)
        {
            Connection _connection = new Connection();
            string sql = @"
                UPDATE Hotel
                SET 
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
                    Cidade_id = @Cidade_id
                WHERE Id = @Id
            ";

            await _connection.Execute(sql, hotel);
        }
    }
}