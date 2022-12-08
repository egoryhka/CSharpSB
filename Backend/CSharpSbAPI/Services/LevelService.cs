using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using Newtonsoft.Json;

namespace CSharpSbAPI.Services
{
    public class LevelService
    {
        private readonly CSharpSbDbContext _context;

        public LevelService(CSharpSbDbContext context)
        {
            _context = context;
        }

        #region CRUD Operation

        public Response GetLevels()
        {
            return new Response<List<Level>>(StatusResp.OK, _context.Levels.ToList());
        }

        public Response GetLevel(int id)
        {
            var exist = _context.Levels.Find(id);
            if (exist == null) return new Response(StatusResp.ClientError, "Не найден");
            return new Response<Level>(StatusResp.OK, exist);
        }

        public Response AddLevel(Level level)
        {
            var exist = _context.Levels.FirstOrDefault(x => x.Name == level.Name);
            if (exist != null)
                return new Response(StatusResp.ClientError, "Уже существует");

            level.Order = GetMaxOrder(level.CourseId) + 1;
            _context.Levels.Add(level);
            _context.SaveChanges();

            return Response.OK;
        }

        public Response UpdateLevel(Level level)
        {
            var exist = _context.Levels.Find(level.Id);
            if (exist == null)
                return new Response(StatusResp.ClientError, "Не найден");

            if (_context.Levels.Any(x => x.Name == level.Name && x.Id != level.Id))
                return new Response(StatusResp.ClientError, "Имя занято");

            exist.Name = level.Name;
            exist.Description = level.Description;
            exist.CourseId = level.CourseId;
            exist.TipText = level.TipText;
            exist.HelpText = level.HelpText;

            _context.SaveChanges();
            return Response.OK;
        }

        public Response DeleteLevel(int levelId)
        {
            var exist = _context.Levels.Find(levelId);
            if (exist == null) return new Response(StatusResp.ClientError, "Не найден");

            _context.Levels.Remove(exist);
            _context.SaveChanges();
            return Response.OK;
        }

        #endregion

        public Response GetHelp(int id)
        {
            var help = _context.Levels.Find(id);
            if (help == null) return new Response(StatusResp.ClientError, "Не найден");
            return new Response<string?>(StatusResp.OK, help.HelpText);

        }

        public int GetMaxOrder(int courseId) => _context.Levels.Where(x => x.CourseId == courseId).Count();
    }
}
