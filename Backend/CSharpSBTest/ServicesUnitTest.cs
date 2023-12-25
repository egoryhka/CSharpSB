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
			var options = GetOptions("Server=(localdb)\\mssqllocaldb;AttachDbFilename=|DataDirectory|PpDb.mdf;Database=PpDb;Trusted_Connection=Yes;");
			db = new CSharpSbDbContext(options);
		}

		private static DbContextOptions GetOptions(string connectionString)
		{
			return SqlServerDbContextOptionsExtensions
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

		[Test]
		public void TestGameService()
		{
			var service = new GameService(db, null, null, null, null);

			service.TestCode(0, "");
		}




	}
}