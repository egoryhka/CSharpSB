using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Newtonsoft.Json.Linq;

namespace CSharpSbAPI.Controllers
{
    [Route("api/v1/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<Response> Register(RegisterModel registerModel)
        {
            var res = _accountService.Register(registerModel, out var token, out var user);
            if (res.Status == StatusResp.OK && token != null)
            {
                HttpContext.Response.Headers["Authorization"] = token;
                await Authenticate(user);
            }
            return res;
        }

        [HttpPost("login")]
        public async Task<Response> Login(LoginModel loginModel)
        {
            var res = _accountService.Login(loginModel, out var user);
            if (res.Status == StatusResp.OK)
            {
                HttpContext.Response.Headers["Authorization"] = user.Token;
                await Authenticate(user);
            }
            return res;
        }

        [HttpPost("update")]
        [Authorize]
        public  Response Edit(UserUpdate userUpdate)
        {
            var res = _accountService.UpdateItem(userUpdate);
            return res;
        }

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim> { new Claim("Id", user.Id.ToString()), };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
