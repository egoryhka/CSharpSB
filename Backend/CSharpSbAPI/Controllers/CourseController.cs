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
            AuthorizedUserInfo.Id = Convert.ToInt32(User.FindFirst("Id").Value);
		}


        [HttpGet("all")]
        public Response GetCourses() => _courseService.GetAll();
        
        [HttpGet("user/{id}/all")]
        public Response GetUsersCourses(int id, int page)
        {
            return _courseService.GetUsersCourses(id, page);
        }

        [HttpGet("{id}")]
        public Response GetCourse(int id) => _courseService.GetCourse(id);

        [HttpPost("add")]
        [Authorize]
        public Response AddCourse(AddCourse course)
        {
            return _courseService.AddCourse(course);
        }

        [HttpPost("update")]
        [Authorize]
        public Response UpdateCourse(Course course)
        {
           
            return _courseService.EditCourse(course);
        }

        [HttpPost("delete")]
        public Response DeleteCourse(int id) => _courseService.DeleteItem(id);

        [HttpPost("getTips")]
        [Authorize(Roles = "User")]
        public Response GetTips(int userId, int courseId) => _courseService.GetTips(userId, courseId);

        [HttpPost("join")]
        [Authorize]
        public Response AssignUser(int courseId)
        {
            var userId = Convert.ToInt32(User.FindFirst("Id").Value);
            return _courseService.AssignUser(userId, courseId);
        }
        
        [HttpPost("leave")]
        [Authorize]
        public Response UnAssignUser(int courseId)
        {
            var userId = Convert.ToInt32(User.FindFirst("Id").Value);
            return _courseService.UnAssignUser(userId, courseId);
        }
    }
}