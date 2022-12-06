using Microsoft.AspNetCore.Mvc;

namespace CSharpSbAPI.Controllers
{
    [ApiController]
    [Route("api/v1/weather")]
    public class IstominController : ControllerBase
    {
        [HttpGet(Name = "GetWeatherForecast")]
        public string Get()
        {
            return "Работает";
        }
    }
}