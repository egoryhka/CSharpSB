using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Mvc;
using CSharpSbAPI.Data.Models;
using Microsoft.AspNetCore.Authorization;

namespace CSharpSbAPI.Controllers
{
	[Route("api/v1/game")]
	[ApiController]
	public class GameController : ControllerBase
	{
		private readonly GameService _gameService;
		public GameController(GameService gameService) => _gameService = gameService;

		[HttpPost("test")]
		public Response TestCode(int levelId, string code) => _gameService.TestCode(levelId, code);
	}
}
