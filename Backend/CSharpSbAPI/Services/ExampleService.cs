using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using System.Data.Entity;

namespace CSharpSbAPI.Services
{
	public class ExampleService : CrudService<Course>
	{
		public ExampleService(CSharpSbDbContext context) : base(context) { }

		public override Response GetAll()
		{
			return new Response<List<Course>>(StatusResp.OK, _context.Courses
				.Include(x => x.Users).ToList());
		}

		protected override Response ValidateUpdate(Course obj)
		{
			if (obj.Name?.Length < 10) return new Response(StatusResp.ClientError, "Меньше 10");
			if (obj.Name?.Length > 25) return new Response(StatusResp.ClientError, "Больше 25");
			return Response.OK;
		}
	}
}
