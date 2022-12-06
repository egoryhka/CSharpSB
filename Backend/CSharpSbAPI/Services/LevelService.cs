using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;

namespace CSharpSbAPI.Services
{
    public class LevelService
    {
        private readonly CSharpSbDbContext _context;

        public LevelService(CSharpSbDbContext context)
        {
            _context = context;
        }

        #region CRUD Operations
        public void Add(string name, string description, int courseId)
        {
            _context.Levels.Add(new ()
            {
                Name = name,
                CourseId = courseId,
                Description = description,
                Order = GetMaxOrder(courseId) + 1
            }); ;
            _context.SaveChanges();
        }
        public void Delete(int levelId) => _context.Levels.Remove(_context.Levels.Find(levelId));

        #endregion

        public int GetMaxOrder(int courseId) => _context.Levels.Where(x => x.CourseId == courseId).Count();
    }
}
