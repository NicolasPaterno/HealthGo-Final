using MySql.Data.MySqlClient;

namespace MinhaPrimeiraApi.Contracts.Infrastructure
{
    public interface IConnection
    {
        MySqlConnection GetConnection();

        Task<int> Execute(string sql, object obj);
    }
}
