using CSharpSbAPI.Data;
using Microsoft.AspNetCore.Server.Kestrel.Transport.Quic;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Data.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Policy;

namespace CSharpSbAPI.Services
{
	public class AccountService : CrudService<User>
	{
		

        public AccountService(CSharpSbDbContext context) : base(context) { }

		#region CRUD Operation

		//      public Response GetUsers()
		//{
		//	return new Response<List<User>>(StatusResp.OK, _context.Users
		//		.Include(x => x.Courses)
		//		.ToList());
		//}

		//public Response GetUser(int id)
		//{
		//	var exist = _context.Users.Find(id);
		//	if (exist == null) return new Response(StatusResp.ClientError, "Не найден");
		//	return new Response<User>(StatusResp.OK, exist);
		//}

		//public Response AddUser(User user)
		//{
		//	var exist = _context.Users.FirstOrDefault(x => x.Login == user.Login);
		//	if (exist != null)
		//		return new Response(StatusResp.ClientError, "Логин занят");

		//	_context.Users.Add(user);
		//	_context.SaveChanges();

		//	return Response.OK;
		//}

		//public Response UpdateUser(User user)
		//{
		//	var exist = _context.Users.Find(user.Id);
		//	if (exist == null)
		//		return new Response(StatusResp.ClientError, "Не найден");

		//	if (_context.Users.Any(x => x.Login == user.Login))
		//		return new Response(StatusResp.ClientError, "Логин занят");

		//	exist.Login = user.Login;
		//	exist.Name = user.Name;
		//	exist.Surname = user.Surname;
		//	exist.Email = user.Email;

		//	_context.SaveChanges();
		//	return Response.OK;
		//}

		//public Response DeleteUser(int userId)
		//{
		//	var exist = _context.Users.Find(userId);
		//	if (exist == null) return new Response(StatusResp.ClientError, "Не найден");

		//	_context.Users.Remove(exist);
		//	_context.SaveChanges();
		//	return Response.OK;
		//}

		#endregion



		//public Response Register(RegisterModel r, out string? token)
		//{
		//	token = null;
		//	if (string.IsNullOrWhiteSpace(r.Login)) return new Response(StatusResp.ClientError, "Не указан логин");
		//	if (string.IsNullOrWhiteSpace(r.Password)) return new Response(StatusResp.ClientError, "Не указан пароль");

		//	token = CreateToken(r);
		//	var user = new User
		//	{
		//		Login = r.Login,
		//		Role = Role.User,
		//		Password = r.Password.GetSha256(),
		//		Token = token
		//	};

		//	return AddUser(user);
		//}

		

		private int GetUserIdByToken(string token)
		{
			var user = _context.Users.FirstOrDefault(user => user.Token == token);
			return user?.Id ?? -1;
		}

		private string CreateToken(RegisterModel r)
		{
			var claims = new List<Claim> { new Claim(ClaimTypes.Name, r.Login!) };

			var jwt = new JwtSecurityToken(
					issuer: AuthOptions.ISSUER,
					audience: AuthOptions.AUDIENCE,
					claims: claims,
					expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
					signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

			return new JwtSecurityTokenHandler().WriteToken(jwt);
		}

	}
}
