using Newtonsoft.Json;

namespace CSharpSbAPI.Data
{
	public static class Extensions
	{

		public static string ToJson(this object o) => JsonConvert.SerializeObject(o);
		public static T? FromJson<T>(this string o) => JsonConvert.DeserializeObject<T>(o);


		

	}
}
