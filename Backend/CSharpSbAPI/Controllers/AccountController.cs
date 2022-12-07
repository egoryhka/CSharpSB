using CSharpSbAPI.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CSharpSbAPI.Controllers
{
    [Route("api/v1/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        [HttpGet("login")]
        public string Login(string name)
        {
			var claims = new List<Claim> { new Claim(ClaimTypes.Name, name) };
			// создаем JWT-токен
			var jwt = new JwtSecurityToken(
					issuer: AuthOptions.ISSUER,
					audience: AuthOptions.AUDIENCE,
					claims: claims,
					expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
					signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

			return new JwtSecurityTokenHandler().WriteToken(jwt);
		}

        [Authorize]
        [HttpGet("register")]
        public ActionResult<string> Register()
        {
            
            return "resp";
            return BadRequest();
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
