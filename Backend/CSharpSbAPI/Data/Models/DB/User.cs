﻿namespace CSharpSbAPI.Data.Models.DB
{
    public class User : IItem
	{
        public int Id { get; set; }

        public string? Login { get; set; }
        public string? Password { get; set; } /*Encrypted password*/
		public string? Token { get; set; }
		public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public ICollection<Course> Courses { get; set;} = new List<Course>();
    }
}
