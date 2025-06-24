using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Dapper;
using MinhaPrimeiraApi.Contracts.Infrastructure;
using MySql.Data.MySqlClient;

namespace MinhaPrimeiraApi.Infrastructure
{
    public class Connection : IConnection
    {
        protected string connectionString = "Server=localhost;Database=healthgo;User=root;Password=root;";

        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(connectionString);
        }

        public async Task<int> Execute(string sql, object obj)
        {
            using(MySqlConnection con = GetConnection())
            {
                return await con.ExecuteAsync(sql, obj);
            }
        }

    }
}
