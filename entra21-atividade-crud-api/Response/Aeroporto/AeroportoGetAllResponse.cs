using MinhaPrimeiraApi.Entity;

namespace MinhaPrimeiraApi.Response.Aeroporto
{
    public class AeroportoGetAllResponse
    {
        public IEnumerable<AeroportoEntity> Data { get; set; }
    }
}