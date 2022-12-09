using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using Newtonsoft.Json;

namespace CSharpSbAPI.Services
{
    public class LevelService : CrudService<Level>
    {
        public LevelService(CSharpSbDbContext context) : base(context) { }

        #region CRUD Operation
        public override Response AddItem(Level level)
        {
            var res = ValidateAdd(level);
            if (res.Status != StatusResp.OK) return res;

            level.Order = GetMaxOrder(level.CourseId) + 1;
            _context.Levels.Add(level);
            _context.SaveChanges();

            return Response.OK;
        }

        protected override Response ValidateUpdate(Level level)
        {
            if (_context.Levels.Any(x => x.Name == level.Name && x.Id != level.Id)) return new Response(StatusResp.ClientError, errors: "Имя занято");
            return Response.OK;
        }
      
        #endregion

        protected override Response ValidateAdd(Level level)
        {
            var exist = _context.Levels.FirstOrDefault(x => x.Name == level.Name);
            if (exist != null) return new Response(StatusResp.ClientError, errors: "Уже существует");
            return Response.OK;
        }

        public Response GetHelp(int id)
        {
            var help = _context.Levels.Find(id);
            if (help == null) return new Response(StatusResp.ClientError, errors: "Не найден");
            return new Response<string?>(StatusResp.OK, help.HelpText);

        }

        public int GetMaxOrder(int courseId) => _context.Levels.Where(x => x.CourseId == courseId).Count();
    }
}
