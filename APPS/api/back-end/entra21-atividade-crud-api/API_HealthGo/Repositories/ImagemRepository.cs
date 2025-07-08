using Dapper;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    public class ImagemRepository : IImagemRepository
    {
        private IConnection _connection;

        public ImagemRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<ImagemEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT Id, Endereco, Nome
                    FROM IMAGEM
                ";

                IEnumerable<ImagemEntity> imagemList = await con.QueryAsync<ImagemEntity>(sql);
                return imagemList;
            }
        }

        public async Task<ImagemEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT Id, Endereco, Nome FROM IMAGEM WHERE Id = @id
                ";

                ImagemEntity imagem = await con.QueryFirstAsync<ImagemEntity>(sql, new { id });
                return imagem;
            }
        }

        public async Task Insert(ImagemInsertDTO imagem)
        {
            string sql = @"
                INSERT INTO IMAGEM (Endereco, Nome)
                VALUES (@Endereco, @Nome)
            ";

            await _connection.Execute(sql, imagem);
        }

        public async Task Update(ImagemEntity imagem)
        {
            string sql = @"
                UPDATE IMAGEM SET
                    Endereco = @Endereco,
                    Nome = @Nome
                WHERE Id = @Id
            ";

            await _connection.Execute(sql, imagem);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM IMAGEM WHERE Id = @id";
            await _connection.Execute(sql, new { id });
        }
    }
}