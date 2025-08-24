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
                    SELECT 
                            ID as {nameof(ImagemEntity.Id)},
                            URL as {nameof(ImagemEntity.Url)},
                            DESCRICAO as {nameof(ImagemEntity.Descricao)},
                            HOTEL_ID as {nameof(ImagemEntity.Hotel_Id)},
                            PESSOA_ID as {nameof(ImagemEntity.Pessoa_Id)}
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
                    SELECT 
                            ID as {nameof(ImagemEntity.Id)},    
                            URL as {nameof(ImagemEntity.Url)},
                            DESCRICAO as {nameof(ImagemEntity.Descricao)},
                            HOTEL_ID as {nameof(ImagemEntity.Hotel_Id)},
                            PESSOA_ID as {nameof(ImagemEntity.Pessoa_Id)}
                    FROM IMAGEM
                    WHERE Id = @id
                ";

                ImagemEntity imagem = await con.QueryFirstAsync<ImagemEntity>(sql, new { id });
                return imagem;
            }
        }

        public async Task Insert(ImagemInsertDTO imagem)
        {
            string sql = @"
                INSERT INTO IMAGEM (URL, DESCRICAO, HOTEL_ID, PESSOA_ID)
                VALUES (@Url, @Descricao, @Hotel_Id, @Pessoa_Id)
            ";

            await _connection.Execute(sql, imagem);
        }

        public async Task Update(ImagemEntity imagem)
        {
            string sql = @"
                UPDATE IMAGEM SET
                    Url = @Url, 
                    Descricao = @Descricao,
                    Hotel_Id = @Hotel_Id,   
                    Pessoa_Id = @Pessoa_Id
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