using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using atividade_bd_csharp.Contracts.Repository;
using atividade_bd_csharp.Entity;
using Dapper;
using MyFirstCRUD.DTO;
using MyFirstCRUD.entity;
using MyFirstCRUD.infrastructure;




namespace atividade_bd_csharp.Repository
{
    public class CamaQuartoRepository : ICamaQuartoRepository
    {
        private readonly Connection _connection;

        public CamaQuartoRepository(Connection connection)
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
                    QUARTOID AS QuartoId
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
                        QUANTIDADE, TIPOCAMA, QUARTOID
                    ) VALUES (
                        @Quantidade, @TipoCama, @QuartoId )
                ";

                var parametros = new
                {
                    camaquarto.Quantidade,
                    TipoCama = camaquarto.TipoCama.ToString(),
                    camaquarto.QuartoId
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
                        QUARTOID = @QuartoId
                    WHERE ID = @Id
                ";

                var parametros = new
                {
                    camaquarto.Id,
                    camaquarto.Quantidade,
                    TipoCama = camaquarto.TipoCama.ToString(),
                    camaquarto.QuartoId
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

        public async Task<CamaQuartoEntity> GetById(int Id)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT 
                        ID AS Id,
                        QUANTIDADE AS Quantidade,
                        TIPOCAMA AS TipoCama,
                        QUARTOID AS QuartoId
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
                        QUARTOID AS QuartoId
                    FROM Cama_Quarto
                    WHERE TIPOCAMA IN @TipoCama
                    ORDER BY TIPOCAMA, ID
                    ";

                return await con.QueryAsync<CamaQuartoEntity>(sql, new { TipoCama = tiposCama });
            }
        }

        private CamaQuartoEntity.EnumCama ConverterStringParaEnum(string tipoCamaString)
        {
            return tipoCamaString switch
            {
                "Solteiro" => CamaQuartoEntity.EnumCama.Solteiro,
                "Casal" => CamaQuartoEntity.EnumCama.Casal,
                "Beliche" => CamaQuartoEntity.EnumCama.Beliche,
                "Futon" => CamaQuartoEntity.EnumCama.Futon,
                _ => CamaQuartoEntity.EnumCama.Solteiro 
            };
        }
    }
}