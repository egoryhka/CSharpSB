using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CSharpSbAPI.Data.Models
{
    public class AuthOptions
    {
        public const string ISSUER = "CsharpSBServer"; // издатель токена
        public const string AUDIENCE = "CsharpSBClient"; // потребитель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
