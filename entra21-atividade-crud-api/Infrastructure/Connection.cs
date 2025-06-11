using Dapper;
using MySql.Data.MySqlClient;

namespace entra21_atividade_crud_api.Infrastructure
{
    public class Connection
    {
        protected string connectionString = "Server=localhost;Database=healthgo;User=root;Password=root;";

        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(connectionString);
        }

        public async Task<int> Execute(string sql, object obj)
        {
            using (MySqlConnection con = GetConnection())
            {
                return await con.ExecuteAsync(sql, obj);
            }
        }

    }
}