using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace CSharpSbAPI.Controllers
{
    [Route("api/v1/level")]
    [ApiController]
    public class LevelController : ControllerBase
    {
        private readonly LevelService _levelService;
        public LevelController(LevelService levelService)
        {
            _levelService = levelService;
        }

        [HttpGet("all")] public Response GetLevels() => _levelService.GetLevels();

        [HttpGet("{id}")] public Response GetLevel(int id) => _levelService.GetLevel(id);

        [HttpPost("add")] public Response AddLevel(Level level) => _levelService.AddLevel(level);

        [HttpPost("update")] public Response UpdateLevel(Level level) => _levelService.UpdateLevel(level);

        [HttpPost("delete")] public Response DeleteLevel(int id) => _levelService.DeleteLevel(id);

        [HttpPost("gethelp")] public Response GetHelp(int id) => _levelService.GetHelp(id);

    }
}
