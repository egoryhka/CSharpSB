using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Authorization;

namespace CSharpSbAPI.Controllers
{
	[Route("api/v1/course/{courseId}/level")]
	[ApiController]

	public class LevelController : ControllerBase
	{
		private readonly LevelService _levelService;
		public LevelController(LevelService levelService)
		{
			_levelService = levelService;
		}

		[HttpGet("all")]
		public Response GetLevels(int courseId)
		{
			int.TryParse(User?.FindFirst("Id")?.Value, out var userId);
			return _levelService.GetAll(courseId, userId);
		}

		[HttpGet("{levelId}")] public Response GetLevel(int id) => _levelService.GetItem(id);

		[HttpPost("add")] public Response AddLevel(int courseId, AddLevel level) => _levelService.AddLevel(level, courseId);

		[HttpPost("update")] public Response UpdateLevel(Level level) => _levelService.UpdateItem(level);

		[HttpPost("delete")] public Response DeleteLevel(int id) => _levelService.DeleteItem(id);

		[HttpPost("getHelp")][Authorize(Roles = "User")] public Response GetHelp(int id) => _levelService.GetHelp(id);
	}
}
