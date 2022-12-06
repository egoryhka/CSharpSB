using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CSharpSbAPI.Controllers
{
    [Route("api/v1/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        [HttpGet("login")]
        public string Login()
        {




            return "Работает";
        }

        [HttpGet("register")]
        public string Register()
        {

            //HttpContext.Response.Headers.Add("Token", );


            return "ХУЕТА";
        }

        [HttpGet("getinfo")]
        public string GetInfo()
        {
            return "Работает";
        }

        [HttpGet("logout")]
        public string LogOut()
        {
            return "Работает";
        }
    }
}
