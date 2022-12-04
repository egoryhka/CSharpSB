namespace CSharpSB.Models.DB
{
    public class User
    {
        public int Id { get; set; }

        public string? login { get; set; }
        public string? Password { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public Role Role { get; set; }
    }
}
