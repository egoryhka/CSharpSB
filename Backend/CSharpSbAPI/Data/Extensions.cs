using Newtonsoft.Json;
using System.Security.Cryptography;

namespace CSharpSbAPI.Data
{
	public static class Extensions
	{

		public static string ToJson(this object o) => JsonConvert.SerializeObject(o);
		public static T? FromJson<T>(this string o) => JsonConvert.DeserializeObject<T>(o);
		public static string GetSha256(this string o) => SHA256.Create(o)?.ToString()!;
	}
}
