using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace CSharpSbAPI.Services
{
	public class LevelService : CrudService<Level>
	{
		public LevelService(CSharpSbDbContext context) : base(context)
		{
		}

		public Response GetLevelEdit(int levelId, int userId)
		{
			var level = _context.Levels.Find(levelId);
			if (level == null) return new Response(StatusResp.ClientError, errors: "Уровень не найден");

			var userCourse = _context.UserCourses.FirstOrDefault(x => x.UserId == userId & x.CourseId == level.CourseId);
			if(userCourse == null || userCourse.Role != Role.Owner) return new Response(StatusResp.ClientError, errors: "Запрещено");

			var resp = new Response<Level>(StatusResp.OK, level);
			return resp;
		}

		public Response GetLevel(int levelId, int userId)
		{
			var level = _context.Levels.Find(levelId);
			if (level == null) return new Response(StatusResp.ClientError, errors: "Уровень не найден");

			var progress = _context.Progresses
				.FirstOrDefault(x => x.UserCourse.UserId == userId &&
								x.UserCourse.CourseId == level.CourseId &&
								x.LevelId == levelId);

			if (progress == null) return new Response(StatusResp.ClientError, errors: "По данному уровню отсутствует прогресс");


			var orderedLevels = _context.Levels.Where(x => x.CourseId == level.CourseId).OrderBy(x => x.Order).ToList();

			var nextLevel = orderedLevels.ElementAtOrDefault(orderedLevels.IndexOf(level) + 1);
			var prevLevel = orderedLevels.ElementAtOrDefault(orderedLevels.IndexOf(level) - 1);

			var nextProgress = nextLevel != null ? _context.Progresses
				.FirstOrDefault(x => x.UserCourse.UserId == userId &&
								x.UserCourse.CourseId == nextLevel.CourseId &&
								x.LevelId == nextLevel.Id) : null;
			var prevProgress = prevLevel != null ? _context.Progresses
				.FirstOrDefault(x => x.UserCourse.UserId == userId &&
								x.UserCourse.CourseId == prevLevel.CourseId &&
								x.LevelId == prevLevel.Id) : null;

			var next = nextLevel != null ? new GetLevel(nextLevel, nextProgress) : null;
			var prev = prevLevel != null ? new GetLevel(prevLevel, prevProgress) : null;

			var resp = new Response<GetLevel>(StatusResp.OK, new GetLevel(level, progress, next, prev));
			return resp;
		}

		public Response GetAll(int courseId, int userId)
		{
			var userCourse = _context.UserCourses.FirstOrDefault(x => x.UserId == userId && x.CourseId == courseId);
			if (userCourse == null) return new Response(StatusResp.ClientError, errors: "Курс для пользователя не найден");

			var currentUserProgresses = from p in _context.Progresses
										where p.UserCourse == userCourse
										select p;

			var query = from l in _context.Levels
						join p in currentUserProgresses
							on l.Id equals p.LevelId into lp
						from p in lp.DefaultIfEmpty()
						where l.CourseId == courseId
						select new { l, p };

			var levels = query.Select(x => new GetLevel(x.l, x.p, null!, null!));

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
				ExpResultsJson = level.CompileResult,
				MainCode = level.MainCode,
				UserCode = level.UserCode,
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