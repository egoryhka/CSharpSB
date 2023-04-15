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
using Microsoft.AspNetCore.Authentication;

namespace CSharpSbAPI.Services
{
    public class AccountService : CrudService<User>
    {
        public AccountService(CSharpSbDbContext context) : base(context) { }

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
        public  Response UpdateItem(UserUpdate userUpdate)
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

            token = CreateToken(r);
            user = new User
            {
                Login = r.Login,
                Role = Role.User,
                Password = r.Password.GetSha256(),
                Token = token
            };

            return AddItem(user);
        }

        public Response Login(LoginModel loginModel, out User user)
        {
            user = null!;
            if (string.IsNullOrWhiteSpace(loginModel.Login)) return new Response(StatusResp.ClientError, "Не указан логин");
            if (string.IsNullOrWhiteSpace(loginModel.Password)) return new Response(StatusResp.ClientError, "Не указан пароль");

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
