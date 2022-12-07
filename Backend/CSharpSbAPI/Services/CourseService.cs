using CSharpSbAPI.Data;
using System.Linq;
using CSharpSbAPI.Data.Models.DB;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using CSharpSbAPI.Data.Models;
using System.Data.Entity;

namespace CSharpSbAPI.Services
{
	public class CourseService
	{
		private readonly CSharpSbDbContext _context;

		public CourseService(CSharpSbDbContext context)
		{
			_context = context;
		}

		#region CRUD Operation

		public Response GetCourses()
		{
			return new Response<List<Course>>(StatusResp.OK, _context.Courses
				.Include(x => x.Users)
				.ToList());
		}

		public Response GetCourse(int id)
		{
			var exist = _context.Courses.Find(id);
			if (exist == null) return new Response(StatusResp.ClientError, "Не найден");
			return new Response<Course>(StatusResp.OK, exist);
		}

		public Response AddCourse(Course course)
		{
			var exist = _context.Courses.FirstOrDefault(x => x.Name == course.Name);
			if (exist != null)
				return new Response(StatusResp.ClientError, "Уже существует");

			_context.Courses.Add(course);
			_context.SaveChanges();

			return Response.OK;
		}

		public Response UpdateCourse(Course course)
		{
			var exist = _context.Courses.Find(course.Id);
			if (exist == null)
				return new Response(StatusResp.ClientError, "Не найден");

			if (_context.Courses.Any(x => x.Name == course.Name))
				return new Response(StatusResp.ClientError, "Имя занято");

			exist.Name = course.Name;
			exist.Description = course.Description;
			_context.SaveChanges();
			return Response.OK;
		}

		public Response DeleteCourse(int courseId)
		{
			var exist = _context.Courses.Find(courseId);
			if (exist == null) return new Response(StatusResp.ClientError, "Не найден");

			_context.Courses.Remove(exist);
			_context.SaveChanges();
			return Response.OK;
		}

		#endregion

		public string GetTips(int userId, int courseId)
		{
			var passLevelIds = _context.Progresses
				.Join(_context.Levels,
				p => p.LevelId,
				l => l.Id,
				(p, l) => new { levelId = p.LevelId, courseId = l.CourseId, status = p.Status, userId = p.UserId })
				.Where(x => x.courseId == courseId && x.userId == userId && x.status != Status.None)
				.Select(x => x.levelId);

			var passTips = _context.Tips
				.Join(_context.Levels,
				t => t.LevelId,
				l => l.Id,
				(t, l) => new { levelId = t.LevelId, name = l.Name, text = t.Text })
				.Where(x => passLevelIds.Contains(x.levelId));

			return JsonConvert.SerializeObject(passTips);
		}


		//public Response GetCourseInfo(int courseId, int userId)
		//{
		//	var courseInfo = _context.UserCourses.FirstOrDefault(x => x.CourseId == courseId && x.UserId == userId);
		//	if (courseInfo == null)
		//		return new Response { Status = StatusCode.ClientError, Error = " пошел нахуй" };


		//}
	}
}
