using CSharpSbAPI.Data;
using System.Linq;
using CSharpSbAPI.Data.Models.DB;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using CSharpSbAPI.Data.Models;

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

		public List<Course> Get() => _context.Courses.ToList();
		
		public Course? Get(int id) => _context.Courses.Find(id);

		public Response Add(Course course)
		{
			var exist = _context.Courses.FirstOrDefault(x => x.Name == course.Name);
			if (exist != null)
				return new Response(StatusResp.ClientError, "Уже существует");

			_context.Courses.Add(new()
			{
				Name = course.Name,
				Description = course.Description,
			});
			_context.SaveChanges();

			return Response.OK;
		}

		public Response Update(Course course)
		{
			var exist = _context.Courses.Find(course.Id);
			if (exist == null)
				return new Response(StatusResp.ClientError, "Не найден");

			if (_context.Courses.Any(x => x.Name == course.Name))
				return new Response(StatusResp.ClientError, "Имя занято");

			_context.Courses.Update(course);
			_context.SaveChanges();
			return Response.OK;
		}

		public void Delete(int courseId)
		{
			var exist = _context.Courses.Find(courseId);
			if (exist != null)
			{
				_context.Courses.Remove(exist);
				_context.SaveChanges();
			}
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
