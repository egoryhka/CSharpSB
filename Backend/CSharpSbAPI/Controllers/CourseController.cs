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

		[HttpGet("course")]
		public ActionResult<Course> GetCourse(int id)
		{
			var course = _courseService.Get(id);
			return course != null ? course : NotFound();
		}

		[HttpGet("courses")]
		public ActionResult<List<Course>> GetCourses()
		{
			var courses = _courseService.Get();
			return courses;
		}

		[HttpPost("add")]
		public IActionResult AddCourse(Course course)
		{
			var res = _courseService.Add(course);
			if (res.Status == StatusResp.OK) return Ok();
			return StatusCode((int)res.Status, res);
		}

		[HttpPost("update")]
		public IActionResult UpdateCourse(Course course)
		{
			var res = _courseService.Update(course);
			if (res.Status == StatusResp.OK) return Ok();
			return StatusCode((int)res.Status, res);
		}
	}
}
