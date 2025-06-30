using MySql.Data.MySqlClient;

namespace entra21_atividade_crud_api.Contracts.Infrastructure
{
    public interface IConnection
    {
        MySqlConnection GetConnection();

        Task<int> Execute(string sql, object obj);
    }
}
