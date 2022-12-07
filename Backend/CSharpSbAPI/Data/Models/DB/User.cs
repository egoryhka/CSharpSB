namespace CSharpSbAPI.Data.Models.DB
{
    public class User
    {
        public int Id { get; set; }

        public string? Login { get; set; }
        public string? Password { get; set; } /*Encrypted password*/
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public Role Role { get; set; }
        public string? Token { get; set; }

        public ICollection<Course> Courses { get; set;}
    }
}
