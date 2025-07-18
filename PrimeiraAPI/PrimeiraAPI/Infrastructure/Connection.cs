using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Dapper;
using MySql.Data.MySqlClient;
using PrimeiraAPI.Contracts.Infraestruture;

namespace MyFirstCRUD.infrastructure
{
    public class Connection : IConnection

    {
        public readonly string connectionString;

        public Connection() 
        {
            connectionString = "Server=localhost;Database=healthgo;User=root;Password=1601@Gabri;"; 
        }

        public MySqlConnection GetConnection()
        {
            var connection = new MySqlConnection(connectionString);
            connection.Open();
            return connection;
        }

        public async Task<int> Execute(string sql, object? param = null)
        {
            using (var con = GetConnection())
            {
                return await con.ExecuteAsync(sql, param);
            }
        }

        public async Task<IEnumerable<T>> Query<T>(string sql, object? param = null)
        {
            using (var con = GetConnection())
            {
                return await con.QueryAsync<T>(sql, param);
            }
        }
    }


}

