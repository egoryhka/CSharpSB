namespace CSharpSbAPI.Data.Models.DB
{
    public class Course
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
