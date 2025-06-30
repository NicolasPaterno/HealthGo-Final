using MySql.Data.MySqlClient;

namespace API_HealthGo.Contracts.Infrastructure
{
    public interface IConnection
    {
        MySqlConnection GetConnection();

        Task<int> Execute(string sql, object obj);
    }
}
