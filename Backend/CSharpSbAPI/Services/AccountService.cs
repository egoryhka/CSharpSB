﻿using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CSharpSbAPI.Services
{
	public class AccountService : CrudService<User>
	{
		public AccountService(CSharpSbDbContext context) : base(context)
		{
		}

		public override Response GetAll()
		{
			return new Response<List<User>>(StatusResp.OK, _context.Users
				.Include(x => x.Courses)
				.ToList());
		}

		protected override Response ValidateAdd(User user)
		{
			var exist = _context.Users.FirstOrDefault(x => x.Login == user.Login);
			if (exist != null) return new Response(StatusResp.ClientError, "Логин занят");
			return Response.OK;
		}

		public Response UpdateItem(UserUpdate userUpdate)
		{
			var exist = _context.Users.Find(userUpdate.Id);
			if (exist == null) return new Response(StatusResp.ClientError, errors: "Не найден");

			exist.Name = userUpdate.Name;
			exist.Email = userUpdate.Email;
			exist.Surname = userUpdate.Surname;
			_context.Users.Update(exist);
			_context.SaveChanges();

			return Response.OK;
		}

		public Response Register(RegisterModel r, out string? token, out User user)
		{
			token = null;
			user = null!;
			if (string.IsNullOrWhiteSpace(r.Login)) return new Response(StatusResp.ClientError, "Не указан логин");
			if (string.IsNullOrWhiteSpace(r.Password)) return new Response(StatusResp.ClientError, "Не указан пароль");

			user = new User
			{
				Login = r.Login,
				Password = r.Password.GetSha256(),
			};
			var result = AddItem(user);
			if (result.Status != StatusResp.OK) return result;

			SetUserToken(user);
			return result;
		}

		public Response Login(LoginModel loginModel, out User user)
		{
			user = null!;
			if (string.IsNullOrWhiteSpace(loginModel.Login))
				return new Response(StatusResp.ClientError, "Не указан логин");
			if (string.IsNullOrWhiteSpace(loginModel.Password))
				return new Response(StatusResp.ClientError, "Не указан пароль");

			var encryptedPassword = loginModel.Password.GetSha256();
			var existLogin = _context.Users.Where(x => x.Login == loginModel.Login);

			if (!existLogin.Any()) return new Response(StatusResp.ClientError, errors: "Несуществущий логин");
			var existUser = existLogin.FirstOrDefault(x => x.Password == encryptedPassword);
			if (existUser == null) return new Response(StatusResp.ClientError, errors: "Неверный пароль");

			user = existUser;
			return new Response<User>(StatusResp.OK, user);
		}

		public Response Login(string token, out User user)
		{
			user = _context.Users.FirstOrDefault(user => user.Token == token)!;
			if (user == null)
			{
				return new Response(StatusResp.ClientError, errors: "Неопознанная ошибка");
			}

			return new Response<User>(StatusResp.OK, user);
		}

		public async Task<Response> Logout(HttpContext ctx)
		{
			await ctx.SignOutAsync();
			return new Response(StatusResp.OK);
		}

		public void SetUserToken(User user)
		{
			var token = CreateToken(user);
			user.Token = token;
			_context.SaveChanges();
		}


		private string CreateToken(User user)
		{
			var claims = new List<Claim> { new Claim("Id", user.Id.ToString()!) };

			var jwt = new JwtSecurityToken(
				issuer: AuthOptions.ISSUER,
				audience: AuthOptions.AUDIENCE,
				claims: claims,
				expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
				signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
					SecurityAlgorithms.HmacSha256));

			return new JwtSecurityTokenHandler().WriteToken(jwt);
		}
	}
}