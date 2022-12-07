using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Mvc;
using CSharpSbAPI.Data.Models;

namespace CSharpSbAPI.Controllers
{
	[Route("api/v1/course")]
	[ApiController]
	public class CourseController : ControllerBase
	{
		private readonly CourseService _courseService;
		public CourseController(CourseService courseService)
		{
			_courseService = courseService;
		}

		[HttpGet("all")] public Response GetCourses() => _courseService.GetCourses();

		[HttpGet("{id}")] public Response GetCourse(int id) => _courseService.GetCourse(id);

		[HttpPost("add")] public Response AddCourse(Course course) => _courseService.AddCourse(course);

		[HttpPost("update")] public Response UpdateCourse(Course course) => _courseService.UpdateCourse(course);

		[HttpPost("delete")] public Response DeleteCourse(int id) => _courseService.DeleteCourse(id);

	}
}
