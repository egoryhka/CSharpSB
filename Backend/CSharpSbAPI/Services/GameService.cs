using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using CodeCompilerLibrary.Tests;
using System;

namespace CSharpSbAPI.Services
{
	public class GameService
	{
		private readonly CSharpSbDbContext _context;

		private readonly LevelService _levelService;
		private readonly CourseService _courseService;
		private readonly ProgressService _progressService;
		private readonly AccountService _accountService;

		public GameService(CSharpSbDbContext context, LevelService levelService, CourseService courseService, ProgressService progressService, AccountService accountService)
		{
			_context = context;
			_levelService = levelService;
			_courseService = courseService;
			_progressService = progressService;
			_accountService = accountService;
		}

		public Response NextLevel(int levelId, int userId)
		{
			var userRes = _accountService.GetItem(userId);
			if (userRes.Status != StatusResp.OK) return userRes;

			var levelRes = _levelService.GetItem(levelId);
			if (levelRes.Status != StatusResp.OK) return levelRes;

			var level = ((Response<Level>)levelRes).Data;
			var orderedLevels = _context.Levels.Where(x => x.CourseId == level.CourseId).OrderBy(x => x.Order).ToList();

			var nextLevel = orderedLevels.ElementAtOrDefault(orderedLevels.IndexOf(level) + 1);
			if (nextLevel == null) return new Response(StatusResp.ClientError, errors: "Уровень не найден");

			var userCourse = _context.UserCourses.FirstOrDefault(x => x.UserId == userId && x.CourseId == nextLevel.CourseId);
			if (userCourse == null) return new Response(StatusResp.ClientError, errors: "Курс для пользователя не найден");

			if (!_context.Progresses.Any(x => x.UserCourse.UserId == userId && x.LevelId == nextLevel.Id))
			{

				var res = _progressService.Add(new Progress()
				{
					LevelId = nextLevel.Id,
					UserCourse = userCourse,
					Status = Status.Current,
					TimeStart = DateTime.Now,
				});

				if (res.Status != StatusResp.OK) return res;
			}

			return new Response<int>(StatusResp.OK, nextLevel.Id);
		}

		public Response TestCode(int userId, int levelId, string code)
		{
			var levelRes = _levelService.GetItem(levelId);
			if (levelRes.Status != StatusResp.OK) return levelRes;

			var level = ((Response<Level>)levelRes).Data;

			var userCourse = _context.UserCourses.FirstOrDefault(x => x.UserId == userId && x.CourseId == level.CourseId);
			if (userCourse == null) return new Response(StatusResp.ClientError, errors: "Курс для пользователя не найден");

			var progress = _context.Progresses.FirstOrDefault(x => x.LevelId == levelId && x.UserCourse == userCourse);
			if (progress == null) return new Response(StatusResp.ClientError, errors: "Не найден прогресс по данному уровню");

			var correctOutputs = level.ExpResultsJson?.FromJson<List<string>>() ?? new List<string>();

			var userCodeExists = !string.IsNullOrEmpty(level.UserCode);

			var mainCode = userCodeExists ? level.MainCode : code;
			var userCode = userCodeExists ? code : "";

			var testResult = CodeTest.Test(mainCode, userCode, correctOutputs);

			progress.Code = code;
			if (testResult.Status == TestResultStatus.Success) progress.Status = Status.Completed;
			_context.SaveChanges();

			return new Response<TestResult>(StatusResp.OK, testResult);
		}

		public Response ResetCode(int userId, int levelId)
		{
			var levelRes = _levelService.GetItem(levelId);
			if (levelRes.Status != StatusResp.OK) return levelRes;

			var level = ((Response<Level>)levelRes).Data;

			var userCourse = _context.UserCourses.FirstOrDefault(x => x.UserId == userId && x.CourseId == level.CourseId);
			if (userCourse == null) return new Response(StatusResp.ClientError, errors: "Курс для пользователя не найден");

			var progress = _context.Progresses.FirstOrDefault(x => x.LevelId == levelId && x.UserCourse == userCourse);
			if (progress == null) return new Response(StatusResp.ClientError, errors: "Не найден прогресс по данному уровню");

			progress.Code = "";
			_context.SaveChanges();

			return Response.OK;
		}
	}
}
