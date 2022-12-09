using CSharpSbAPI.Data;
using System.Linq;
using CSharpSbAPI.Data.Models.DB;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using CSharpSbAPI.Data.Models;
using System.Data.Entity;

namespace CSharpSbAPI.Services
{
    public class CourseService : CrudService<Course>
    {
        public CourseService(CSharpSbDbContext context) : base(context) { }


        public override Response GetAll()
        {
            return new Response<List<Course>>(StatusResp.OK, _context.Courses
                .Include(x => x.Users).ToList());
        }

        public override Response GetItem(int id)
        {
            var exist = _context.Courses.Include(x => x.Users).FirstOrDefault(x => x.Id == id);
            if (exist == null) return new Response(StatusResp.ClientError, errors: "Не найден");
            return new Response<Course>(StatusResp.OK, exist);
        }

        protected override Response ValidateAdd(Course course)
        {
            var exist = _context.Courses.FirstOrDefault(x => x.Name == course.Name);
            if (exist != null) return new Response(StatusResp.ClientError, errors: "Уже существует");
            return Response.OK;
        }

        protected override Response ValidateUpdate(Course course)
        {
            if (_context.Courses.Any(x => x.Name == course.Name)) return new Response(StatusResp.ClientError, errors: "Имя занято");
            return Response.OK;
        }

        public Response GetTips(int userId, int courseId)
        {
            var passLevelTips = _context.Progresses
                .Join(_context.Levels,
                p => p.LevelId,
                l => l.Id,
                (p, l) => new { levelId = p.LevelId, courseId = l.CourseId, status = p.Status, userId = p.UserId, tiptext = l.TipText })
                .Where(x => x.courseId == courseId && x.userId == userId && x.status != Status.None)
                .Select(x => new Tip { tiptext = x.tiptext })
                .ToList();

            return new Response<List<Tip>>(StatusResp.OK, passLevelTips);
        }     
    }
}
