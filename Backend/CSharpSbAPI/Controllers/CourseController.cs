using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Mvc;
using CSharpSbAPI.Data.Models;
using Microsoft.AspNetCore.Authorization;

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


		[HttpGet("all")]  public Response GetCourses() => _courseService.GetAll();

		[HttpGet("{id}")] public Response GetCourse(int id) => _courseService.GetItem(id);

		[HttpPost("add")] public Response AddCourse(Course course) => _courseService.AddItem(course);

		[HttpPost("update")] public Response UpdateCourse(Course course) => _courseService.UpdateItem(course);

		[HttpPost("delete")] public Response DeleteCourse(int id) => _courseService.DeleteItem(id);

        [HttpPost("getTips")][Authorize(Roles = "User")] public  Response GetTips(int userId, int courseId) => _courseService.GetTips(userId, courseId);

        [HttpPost("join")][Authorize] public Response AssignUser(int userId, int courseId) => _courseService.AssignUser(userId, courseId);
    }
}
