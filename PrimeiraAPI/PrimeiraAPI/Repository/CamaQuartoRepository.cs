using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using atividade_bd_csharp.Contracts.Repository;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using Dapper;
using PrimeiraAPI.Contracts.Infraestruture;


namespace atividade_bd_csharp.Repository
{
    public class CamaQuartoRepository : ICamaQuartoRepository
    {
        private readonly IConnection _connection;

        public CamaQuartoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<CamaQuartoEntity>> GetAll()
        {
            try
            {
                using var con = _connection.GetConnection();
                string sql = @"
                SELECT 
                    ID AS Id,
                    QUANTIDADE AS Quantidade,
                    TIPOCAMA AS TipoCama,
                    Quarto_id AS QuartoId
                FROM Cama_Quarto
                WHERE TipoCama IN ('Solteiro', 'Casal', 'Beliche', 'Futon')
                ORDER BY TipoCama
                ";
                var resultado = await con.QueryAsync<dynamic>(sql);

                return resultado.Select(r => new CamaQuartoEntity
                {
                    Id = r.Id,
                    Quantidade = r.Quantidade,
                    TipoCama = ConverterStringParaEnum(r.TipoCama),
                    QuartoId = r.QuartoId
                });

            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar todas as camas: {ex.Message}", ex);
            }
        }

        public async Task Insert(CamaQuartoEntity camaquarto)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    INSERT INTO Cama_Quarto (
                        QUANTIDADE, TIPOCAMA, Quarto_id
                    ) VALUES (
                        @Quantidade, @TipoCama, @QuartoId )
                ";

                var parametros = new
                {
                    camaquarto.Quantidade,
                    TipoCama = ((int)camaquarto.TipoCama),
                    QuartoId = camaquarto.QuartoId
                };

                await con.ExecuteAsync(sql, parametros);
            }
        }

        public async Task Update(CamaQuartoEntity camaquarto)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"

                    UPDATE Cama_Quarto 
                    SET 
                        QUANTIDADE = @Quantidade,
                        TIPOCAMA = @TipoCama,
                        Quarto_id = @QuartoId
                    WHERE ID = @Id
                ";

                var parametros = new
                {
                    camaquarto.Id,
                    camaquarto.Quantidade,
                    TipoCama = ((int)camaquarto.TipoCama),
                    QuartoId = camaquarto.QuartoId
                };

                await con.ExecuteAsync(sql, parametros);
            }


        }

        public async Task Delete(int Id)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    DELETE FROM Cama_Quarto WHERE ID = @Id
                ";

                await con.ExecuteAsync(sql, new { Id });
            }
        }

        public async Task DeleteByQuartoId(int quartoId)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"DELETE FROM Cama_Quarto WHERE Quarto_id = @QuartoId";
                await con.ExecuteAsync(sql, new { QuartoId = quartoId });
            }
        }

        public async Task<CamaQuartoEntity> GetById(int Id)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT 
                        ID AS Id,
                        QUANTIDADE AS Quantidade,
                        TIPOCAMA AS TipoCama,
                        Quarto_id AS QuartoId
                    FROM Cama_Quarto
                    WHERE ID = @Id
                    ";

                return await con.QueryFirstOrDefaultAsync<CamaQuartoEntity>(sql, new { Id });
            }
        }

        public async Task<IEnumerable<CamaQuartoEntity>> GetByTipoCama(params string[] tiposCama)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT 
                        ID AS Id,
                        QUANTIDADE AS Quantidade,
                        TIPOCAMA AS TipoCama,
                        Quarto_id AS QuartoId
                    FROM Cama_Quarto
                    WHERE TIPOCAMA IN @TipoCama
                    ORDER BY TIPOCAMA, ID
                    ";

                return await con.QueryAsync<CamaQuartoEntity>(sql, new { TipoCama = tiposCama });
            }
        }

        private StatusCamaEntity ConverterStringParaEnum(string tipoCamaString)
        {
            return tipoCamaString switch
            {
                "Solteiro" => StatusCamaEntity.Solteiro,
                "Casal" => StatusCamaEntity.Casal,
                "Beliche" => StatusCamaEntity.Beliche,
                "Futon" => StatusCamaEntity.Futon,
                _ => StatusCamaEntity.Solteiro
            };
        }
    }
}