using CSharpSbAPI.Data.Models.DB;
using Microsoft.EntityFrameworkCore;


namespace CSharpSbAPI.Data
{
    public class CSharpSbDbContext : DbContext
    {

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Course> Courses { get; set; } = null!;
        public DbSet<UserCourse> UserCourses { get; set; } = null!;

        public DbSet<Level> Levels { get; set; } = null!;
        public DbSet<Progress> Progresses { get; set; } = null!;

        public DbSet<Help> Helps { get; set; } = null!;           
        public DbSet<Tip> Tips { get; set; } = null!;
       

        public CSharpSbDbContext(DbContextOptions<CSharpSbDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
