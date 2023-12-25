﻿using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DTO.Level;
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
		}

		[HttpPost("test")]
		public Response TestCode(TestCode model) => _gameService.TestCode(model.levelId, model.code);

		[HttpGet("nextLevel")]
		public Response NextLevel(int levelId, int userId) => _gameService.NextLevel(levelId, userId);
	}
}
