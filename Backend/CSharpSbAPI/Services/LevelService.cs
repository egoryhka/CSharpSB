using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;

namespace CSharpSbAPI.Services
{
	public class LevelService : CrudService<Level>
	{
		public LevelService(CSharpSbDbContext context) : base(context)
		{
		}

		public Response GetAll(int courseId, int userId)
		{
			var userCourse = _context.UserCourses.FirstOrDefault(x => x.UserId == userId && x.CourseId == courseId);
			if (userCourse == null) return new Response(StatusResp.ClientError, errors: "Курс для пользователя не найден");

			var levels = _context.Progresses
				.Where(x => x.UserCourse == userCourse)
				.Join(_context.Levels,
					p => p.LevelId,
			 		l => l.Id,
						(p, l) => new
						{
							progress = p,
							level = l,
						})
				.Select(x => new GetLevel(x.level, x.progress)).ToList();

			var resp = new Response<IEnumerable<GetLevel>>(StatusResp.OK, levels);
			return resp;
		}

		public Response AddLevel(AddLevel level, int courseId)
		{
			var course = _context.Courses.FirstOrDefault(x => x.Id == courseId);
			if (course is null) return new Response(StatusResp.ClientError, "Курс не найден");
			var res = ValidateAdd(level, courseId);
			if (res.Status != StatusResp.OK) return res;
			var newLevel = new Level()
			{
				Name = level.Name,
				HelpText = level.HelpText,
				Description = level.Description,
				ExpResultsJson = level.CompileResult
			};
			newLevel.Order = GetMaxOrder(courseId) + 1;
			newLevel.CourseId = courseId;
			_context.Levels.Add(newLevel);

			var ownerUserCourse = _context.UserCourses.FirstOrDefault(x => x.Course == course && x.Role == Role.Owner);
			if (ownerUserCourse is null) return new Response(StatusResp.ClientError, "Владелец курса не найден");

			var progress = new Progress()
			{
				UserCourse = ownerUserCourse,
				Status = Status.Admin,
				Level = newLevel,
				TimeStart = DateTime.Now,
			};
			_context.Progresses.Add(progress);

			_context.SaveChanges();

			return Response.OK;
		}

		protected override Response ValidateUpdate(Level level)
		{
			if (_context.Levels.Any(x => x.Name == level.Name && x.Id != level.Id))
				return new Response(StatusResp.ClientError, errors: "Имя занято");
			return Response.OK;
		}

		protected Response ValidateAdd(AddLevel level, int courseId)
		{
			var exist = _context.Levels.FirstOrDefault(x => x.Name == level.Name && x.CourseId == courseId);
			if (exist != null)
				return new Response(StatusResp.ClientError, "Ошибка при создании уровня", errors: "уровень с таким именем уже существует");

			var course = _context.Courses.Find(courseId);
			if (course == null)
				return new Response(StatusResp.ClientError, "Ошибка при создании уровня",
					errors: "указан несуществующий курс");
			return Response.OK;
		}

		public Response GetHelp(int id)
		{
			var help = _context.Levels.Find(id);
			if (help == null) return new Response(StatusResp.ClientError, "Ошибка при создании уровня", errors: "Не найден");
			return new Response<string?>(StatusResp.OK, help.HelpText);
		}

		public int GetMaxOrder(int courseId) => _context.Levels.Where(x => x.CourseId == courseId).Count();
	}
}