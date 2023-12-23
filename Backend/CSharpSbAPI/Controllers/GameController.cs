using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CSharpSbAPI.Controllers
{
	[Route("api/v1/game")]
	[ApiController]
	public class GameController : ControllerBase
	{
		private readonly GameService _gameService;
		public GameController(GameService gameService)
		{
			_gameService = gameService;
			AuthorizedUserInfo.Id = Convert.ToInt32(User.FindFirst("Id").Value);
		}

		[HttpPost("test")]
		public Response TestCode(int levelId, string code) => _gameService.TestCode(levelId, code);

		[HttpGet("levels")]
		public Response GetLevels(int courseId, int userId) => _gameService.GetLevels(courseId, userId);

		[HttpGet("nextLevel")]
		public Response NextLevel(int levelId, int userId) => _gameService.NextLevel(levelId, userId);
	}
}
