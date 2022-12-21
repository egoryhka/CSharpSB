using CSharpSbAPI.Data.Models.DB;

namespace CSharpSbAPI.Data.Models
{
	public record Tip { public string? tiptext { get; set; } }

	public record UserLevel
	{
		public int levelId { get; set; }
		public int order { get; set; }
		public string? name { get; set; }
		public Status? status { get; set; }
	}


}
