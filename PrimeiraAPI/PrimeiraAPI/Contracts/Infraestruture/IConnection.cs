using MySql.Data.MySqlClient;

namespace PrimeiraAPI.Contracts.Infraestruture
{
    public interface IConnection
    {
        MySqlConnection GetConnection();

        Task<int> Execute(string sql, object obj);
    }
}
