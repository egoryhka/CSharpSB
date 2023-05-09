using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSharpSbAPI.Data.Models.DB
{
    public class Course : IItem
	{
		public int Id { get; set; }

		public string? Name { get; set; }
		public string? Description { get; set; }
		public int? LevelCount { get; set; } = 0;
		public ICollection<User> Users { get; set; } = new List<User>();
	}
}
