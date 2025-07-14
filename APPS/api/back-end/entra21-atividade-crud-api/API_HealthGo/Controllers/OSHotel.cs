using API_HealthGo.Contracts.Service;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OSHotel : ControllerBase
    {
        private IPessoaService _service;

        public OSHotel(IPessoaService service)
        {
            _service = service;
        }
    }
}
