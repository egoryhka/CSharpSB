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

		public Response GetLevels(int courseId, int userId)
		{
			var userRes = _accountService.GetItem(userId);
			if (userRes.Status != StatusResp.OK) return userRes;

			var courseRes = _courseService.GetItem(courseId);
			if (courseRes.Status != StatusResp.OK) return courseRes;

			var levelRes = _levelService.GetAll();
			if (levelRes.Status != StatusResp.OK) return levelRes;

			var levels = ((Response<List<Level>>)levelRes).Data;

			var courseLevelsForUser = levels
				.Where(x => x.CourseId == courseId)
				.GroupJoin(_context.Progresses.Where(x => x.UserId == userId),
				l => l.Id,
				p => p.LevelId,
				(l, p) => new
				{
					level = l,
					progresses = p
				})
				.SelectMany(
				lp => lp.progresses.DefaultIfEmpty(),
				(l, p) => new UserLevel
				{
					levelId = l.level.Id,
					name = l.level.Name,
					order = l.level.Order,
					status = p?.Status
				}).ToList();

			return new Response<List<UserLevel>>(StatusResp.OK, courseLevelsForUser);
		}

		public Response NextLevel(int levelId, int userId)
		{
			var userRes = _accountService.GetItem(userId);
			if (userRes.Status != StatusResp.OK) return userRes;

			var levelRes = _levelService.GetItem(levelId);
			if (levelRes.Status != StatusResp.OK) return levelRes;

			var level = ((Response<Level>)levelRes).Data;
			var nextLevel = _context.Levels.FirstOrDefault(x => x.CourseId == level.CourseId && x.Order == level.Order + 1);
			if (nextLevel == null) return new Response(StatusResp.ClientError, errors: "Уровень не найден");

			if (!_context.Progresses.Any(x => x.UserId == userId && x.LevelId == nextLevel.Id))
			{
				var res = _progressService.Add(new Progress()
				{
					LevelId = nextLevel.Id,
					UserId = userId,
					//TODO - сюда CurseID Докинуть
				});

				if (res.Status != StatusResp.OK) return res;
			}

			return Response.OK;
		}

		public Response TestCode(int levelId, string code)
		{
			var levelRes = _levelService.GetItem(levelId);
			if (levelRes.Status != StatusResp.OK) return levelRes;

			var level = ((Response<Level>)levelRes).Data;

			var correctOutputs = level.ExpResultsJson.FromJson<List<string>>();


			var mainCode = @"
					     Console.WriteLine(Max(new int[0]));
					     Console.WriteLine(Max(new[] { 3 }));
					     Console.WriteLine(Max(new[] { 3, 1, 2 }));
					     Console.WriteLine(Max(new[] { ""A"", ""B"", ""C"" }));";

			code = @"
						static T Max<T>(T[] source) where T:IComparable
						{
						    if(source.Length == 0)
						        return default(T);
								
						    var max = source[0];
							
							for(int i=1;i<source.Length;i++)
							{
							  if(source[i].CompareTo(max) == 1) max = source[i];
							}

							
						
							return max;
						}
					";

			var testResult = CodeTest.Test(mainCode, code, correctOutputs);

			return new Response<TestResult>(StatusResp.OK, testResult);
		}



	}
}
