using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using CodeCompilerLibrary.Tests;

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

		//Переход чела на уровень после записи на курс



		//Отправка кода на проверку

		//public Response TestCode() 
		//{
		//    return  StatusResp.OK;
		//}

		////Переход на новый уровень


		//public Response CheckLevelCount(int courseId, int userId) 
		//{
		//    var alllevels = _levelService.GetAll();
		//    var needLevels = ((Response<List<Level>>)alllevels).Data.Where(x => x.CourseId == courseId);

		//    var userLevels = _progressService.GetItem(userId);


		//}





	}
}
