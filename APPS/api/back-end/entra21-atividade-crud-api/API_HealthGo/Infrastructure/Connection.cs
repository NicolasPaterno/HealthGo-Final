﻿using Dapper;
using API_HealthGo.Contracts.Infrastructure;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Infrastructure
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
            using (MySqlConnection con = GetConnection())
            {
                return await con.ExecuteAsync(sql, obj);
            }
        }

    }
}
