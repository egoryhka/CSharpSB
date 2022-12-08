using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Mvc;
using CSharpSbAPI.Data.Models;

namespace CSharpSbAPI.Controllers
{
	[Route("api/v1/example")]
	[ApiController]
	public class ExampleController : ControllerBase
	{
		private readonly ExampleService _exampleService;
		public ExampleController(ExampleService exampleService)
		{
			_exampleService = exampleService;
		}

		[HttpGet("all")] public Response GetCourses() => _exampleService.GetAll();

		[HttpGet("{id}")] public Response GetCourse(int id) => _exampleService.GetItem(id);
		
		[HttpPost("update")] public Response UpdateCourse(Course course) => _exampleService.UpdateItem(course);

		[HttpPost("delete")] public Response DeleteCourse(int id) => _exampleService.DeleteItem(id);

	}
}
