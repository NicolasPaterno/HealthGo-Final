using Dapper;
using MySql.Data.MySqlClient;
using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Infrastructure;

namespace entra21_atividade_crud_api.Repository
{
    public class EspecialidadeRepository : IEspecialidadeRepository
    {
        public async Task<IEnumerable<EspecialidadeEntity>> GetAll()
        {
            Connection _connection = new Connection();
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                     SELECT ID AS {nameof(EspecialidadeEntity.Id)},
                            NOME AS {nameof(EspecialidadeEntity.Nome)}
                      FROM ESPECIALIDADE
                ";

                IEnumerable<EspecialidadeEntity> specialtyList = await con.QueryAsync<EspecialidadeEntity>(sql);
                return specialtyList;
            }
        } // Read

        public async Task Insert(EspecialidadeInsertDTO newSpecialty)
        {
            Connection _connection = new Connection();
            string sql = @$"
                 INSERT INTO ESPECIALIDADE (NOME)
                    VALUES
                    (@Nome)
            ";

            await _connection.Execute(sql, newSpecialty);
        }


        public async Task Update(EspecialidadeEntity specialty)
        {
            Connection _connection = new Connection();

            string sql = @"
                UPDATE ESPECIALIDADE
                    SET 
                        NOME = @Nome
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, specialty);
        }

        public async Task<EspecialidadeEntity> GetById(int id) // usado no Update
        {
            Connection _connection = new Connection();
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                     SELECT ID AS {nameof(EspecialidadeEntity.Id)},
                            NOME AS {nameof(EspecialidadeEntity.Nome)}
                      FROM ESPECIALIDADE
                      WHERE ID = @Id
                ";

                EspecialidadeEntity specialty = await con.QueryFirstAsync<EspecialidadeEntity>(sql, new { id });
                return specialty;
            }
        }

        public async Task Delete(int id)
        {
            Connection _connection = new Connection();
            string sql = @"
                DELETE FROM ESPECIALIDADE
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, new { id });
        }

    }
}