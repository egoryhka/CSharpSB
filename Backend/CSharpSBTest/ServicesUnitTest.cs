using CodeCompilerLibrary;
using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Services;
using CSharpSBTest;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;

namespace CSharpSandboxTests
{
	public class ServicesUnitTest
	{

		private CSharpSbDbContext db;

		public ServicesUnitTest()
		{
			var options = GetOptions("Server=(localdb)\\mssqllocaldb;Database=GAVNOMOCHAZHOPA;Trusted_Connection=True;");
			db = new CSharpSbDbContext(options);
		}

		private static DbContextOptions<CSharpSbDbContext> GetOptions(string connectionString)
		{
			return (DbContextOptions<CSharpSbDbContext>)SqlServerDbContextOptionsExtensions
				.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
		}

		[SetUp]
		public void Setup()
		{
		}

		[Test]
		public void TestUserCources()
		{
			var service = new CourseService(db);
			var course = new Course() { Description="Da",  };
			//service.AddCourse();
		}





	}
}