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

namespace CSharpSbAPI.Services
{
    public class AccountService
    {
        private readonly CSharpSbDbContext _context;

        public AccountService(CSharpSbDbContext context)
        {
            _context = context;
        }




        #region CRUD Operation
        public void Add(User user)
        {

            _context.Users.Add(user);
            _context.SaveChanges();






        }
        public void Delete(int userId) => _context.Users.Remove(_context.Users.Find(userId));



        #endregion

        public void Authenticate(User user)
        {
            //HttpContext.
        }

        public Response Register(RegisterModel r,out string token)
        {
            var user = _context.Users.FirstOrDefault(x => x.Login == r.Login);
            token = null;

            if (user == null)
            {
                token = CreateToken(r);
                user = new User
                {
                    Email = r.Email,
                    Login = r.Login,
                    Name = r.Name,
                    Surname = r.Surname,
                    Role = Role.User,
                    Password = GetEncrypedPassword(r.Password),
                    Token = token
                };
                _context.Users.Add(user);
                _context.SaveChanges();

                return new Response { Status = StatusCode.OK };
            }

            else
                return new Response
                {
                    Status = StatusCode.ClientError,
                    Error = "Такой пользователь существует",
                    Description = "Ты неоригинальное мудило"
                };
        }

        private string? GetEncrypedPassword(string password) => SHA256.Create(password)?.ToString();




        public int ParseToken(string token)
        {

            var trueUser = _context.Users.FirstOrDefault(user => user.Token == token);

            if (trueUser == null)
            {
                return -1;
            }

            return trueUser.Id;
        }

        #region jwt token

        private string? CreateToken(RegisterModel r)
        {
            var user = _context.Users.FirstOrDefault(x => x.Login == r.Login);
            if (user == null)
                return null;

            var claims = new List<Claim>
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login.ToString()),

                };

            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }
        #endregion

        private ClaimsIdentity GetIdentity(string login, string password)
        {
            var user = _context.Users.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
