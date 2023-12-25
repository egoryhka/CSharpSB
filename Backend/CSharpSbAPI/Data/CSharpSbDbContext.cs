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

		public CSharpSbDbContext(DbContextOptions/*<CSharpSbDbContext>*/ options) : base(options)
		{
			//Database.EnsureCreated(); переходим на миграции
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<User>()
				.HasMany(x => x.Courses)
				.WithMany(x => x.Users)
					.UsingEntity<UserCourse>(x => x
						.HasOne(y => y.Course)
							.WithMany().HasForeignKey(x => x.CourseId), x => x.HasOne(y => y.User)
							.WithMany().HasForeignKey(x => x.UserId));
		}
	}
}
