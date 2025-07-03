using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class AvaliacaoRepository : IAvaliacaoRepository
    {
        private IConnection _connection;

        public AvaliacaoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<AvaliacaoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(AvaliacaoEntity.Id)},
                           NOTA AS {nameof(AvaliacaoEntity.Nota)},
                           COMENTARIO AS {nameof(AvaliacaoEntity.Comentario)},
                           PESSOA_ID AS {nameof(AvaliacaoEntity.Pessoa_Id)}
                      FROM AVALIACAO
                ";
                IEnumerable<AvaliacaoEntity> avaliacaoList = await con.QueryAsync<AvaliacaoEntity>(sql);
                return avaliacaoList;
            }
        }

        public async Task Insert(AvaliacaoInsertDTO avaliacao)
        {
            string sql = @$"
                INSERT INTO AVALIACAO (NOTA, COMENTARIO, PESSOA_ID)
                             VALUES (@Nota, @Comentario, @Pessoa_Id)
            ";
            await _connection.Execute(sql, avaliacao);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM AVALIACAO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<AvaliacaoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(AvaliacaoEntity.Id)},
                           NOTA AS {nameof(AvaliacaoEntity.Nota)},
                           COMENTARIO AS {nameof(AvaliacaoEntity.Comentario)},
                           PESSOA_ID AS {nameof(AvaliacaoEntity.Pessoa_Id)}
                      FROM AVALIACAO
                     WHERE ID = @Id
                ";
                AvaliacaoEntity avaliacao = await con.QueryFirstAsync<AvaliacaoEntity>(sql, new { id });
                return avaliacao;
            }
        }

        public async Task Update(AvaliacaoEntity avaliacao)
        {
            string sql = @$"
                UPDATE AVALIACAO
                   SET NOTA = @Nota,
                       COMENTARIO = @Comentario,
                       PESSOA_ID = @Pessoa_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, avaliacao);
        }
    }
}