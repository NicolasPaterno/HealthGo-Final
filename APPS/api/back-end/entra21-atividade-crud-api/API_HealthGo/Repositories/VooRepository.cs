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
                        CODIGOVOO AS {nameof(VooEntity.CodigoVoo)},
                        DATAHORAPARTIDA AS {nameof(VooEntity.DataHoraPartida)},
                        DATAHORACHEGADA AS {nameof(VooEntity.DataHoraChegada)},
                        ORIGEM_ID AS {nameof(VooEntity.Origem_Id)},
                        DESTINO_ID AS {nameof(VooEntity.Destino_Id)},
                        COMPANHIA AS  {nameof(VooEntity.Companhia)}
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
                        CODIGOVOO AS {nameof(VooEntity.CodigoVoo)},
                        DATAHORAPARTIDA AS {nameof(VooEntity.DataHoraPartida)},
                        DATAHORACHEGADA AS {nameof(VooEntity.DataHoraChegada)},
                        ORIGEM_ID AS {nameof(VooEntity.Origem_Id)},
                        DESTINO_ID AS {nameof(VooEntity.Destino_Id)},
                        COMPANHIA AS  {nameof(VooEntity.Companhia)}
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
                INSERT INTO VOO (CODIGOVOO, DATAHORAPARTIDA, DATAHORACHEGADA, ORIGEM_ID, DESTINO_ID, COMPANHIA)
                    VALUES (@CodigoVoo, @DataHoraPartida, @DataHoraChegada, @Origem_Id, @Destino_Id, @Companhia)
            ";

            await _connection.Execute(sql, assento);
        }

        public async Task Update(VooEntity voo)
        {
            string sql = @"
                UPDATE VOO
                    SET CODIGOVOO = @CodigoVoo,
                        DATAHORAPARTIDA = @DataHoraPartida,
                        DATAHORACHEGADA = @DataHoraChegada,
                        ORIGEM_ID = @Origem_Id,
                        DESTINO_ID = @Destino_Id,
                        COMPANHIA = @Companhia
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, voo);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM VOO WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

        public async Task<IEnumerable<VooDetalhadoDTO>> GetVoosDetalhado()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT
                        AEROPORTO_ORIGEM.Nome AS NomeAeroportoOrigem,
                        AEROPORTO_DESTINO.Nome AS NomeAeroportoDestino,
                        CIDADE_ORIGEM.Nome AS CidadeOrigem,
                        CIDADE_DESTINO.Nome AS CidadeDestino,
                        Voo.Numero AS NumeroVoo,
                        Voo.Assento_Tipo AS TipoAssento,
                        Voo.Preco AS Preco,
                        Voo.Companhia AS Companhia
                    FROM Voo
                    INNER JOIN Aeroporto AS AEROPORTO_ORIGEM ON AEROPORTO_ORIGEM.Id = Voo.AeroportoOrigem_Id
                    INNER JOIN Aeroporto AS AEROPORTO_DESTINO ON AEROPORTO_DESTINO.Id = Voo.AeroportoDestino_Id
                    INNER JOIN Cidade AS CIDADE_ORIGEM ON CIDADE_ORIGEM.Id = AEROPORTO_ORIGEM.Cidade_Id
                    INNER JOIN Cidade AS CIDADE_DESTINO ON CIDADE_DESTINO.Id = AEROPORTO_DESTINO.Cidade_Id;
                ";

                IEnumerable<VooDetalhadoDTO> vooDetalhadoList = await con.QueryAsync<VooDetalhadoDTO>(sql);
                return vooDetalhadoList;
            }
        }

        public async Task<int> GetIdByNumero(string numero)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = "SELECT Id FROM Voo WHERE Numero = @numero";
                return await con.QueryFirstAsync<int>(sql, new { numero });
            }
        }

    }
}

