using CSharpSbAPI.Data;
using System.Linq;
using CSharpSbAPI.Data.Models.DB;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;


namespace CSharpSbAPI.Services
{
    public class CourseService
    {
        private readonly CSharpSbDbContext _context;

        public CourseService(CSharpSbDbContext context)
        {
            _context = context;
        }

        #region CRUD Operation
        public void Add(string name, string description)
        {

            _context.Courses.Add(new()
            {
                Name = name,
                Description = description,
            });
            _context.SaveChanges();
        }

        public void Delete(int courseId) => _context.Courses.Remove(_context.Courses.Find(courseId));


        #endregion


        public string GetTips(int userId, int courseId)
        {
            var passLevelIds = _context.Progresses
                .Join(_context.Levels,
                p => p.LevelId,
                l => l.Id,
                (p, l) => new { levelId = p.LevelId, courseId = l.CourseId, status = p.Status, userId = p.UserId })
                .Where(x => x.courseId == courseId && x.userId == userId && x.status != Status.None)
                .Select(x => x.levelId);

            var passTips = _context.Tips
                .Join(_context.Levels,
                t => t.LevelId,
                l => l.Id,
                (t, l) => new { levelId = t.LevelId, name = l.Name, text = t.Text })
                .Where(x => passLevelIds.Contains(x.levelId));

            return JsonConvert.SerializeObject(passTips);
        }

    }
}
