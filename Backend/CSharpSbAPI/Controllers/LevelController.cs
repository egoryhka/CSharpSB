using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CSharpSbAPI.Controllers
{
    [Route("api/v1/level")]
    [ApiController]
    public class LevelController : ControllerBase
    {
        [HttpGet(Name = "Level")]
        public string Get()
        {
            return "Работает";
        }
    }
}
