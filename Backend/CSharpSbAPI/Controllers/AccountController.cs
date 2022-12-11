using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Services;
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
		private readonly AccountService _accountService;
		public AccountController(AccountService accountService)
		{
			_accountService = accountService;
		}

		//[HttpPost("register")]
		//public Response Register(RegisterModel registerModel)
		//{
		//	var res = _accountService.Register(registerModel, out var token);
		//	if (res.Status == StatusResp.OK && token != null) HttpContext.Response.Headers["Token"] = token;
		//	return res;
		//}

		//[HttpPost("login")]
		//public Response Login(string name)
		//{
		//	return null!;
		//}

		//[HttpPost("update")] public Response UpdateUser(User user) => _accountService.UpdateUser(user);

		//[HttpGet("logout")] public string LogOut() => ""; 
	}
}
