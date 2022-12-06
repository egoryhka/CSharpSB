using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CSharpSbAPI.Controllers
{
    [Route("api/v1/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        [HttpGet(Name = "Course")]
        public string GetTips()
        {
            return "Работает";
        }
    }
}
