
using MinhaPrimeiraApi.Entity;

namespace MinhaPrimeiraApi.Response.Nacao
{
    public class NacaoGetAllResponse
    {
        public IEnumerable<NacaoEntity> Data { get; set; }
    }
}