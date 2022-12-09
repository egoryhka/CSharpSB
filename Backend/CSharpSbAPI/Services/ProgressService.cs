using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Data.Models;

namespace CSharpSbAPI.Services
{
    public class ProgressService : CrudService<Progress>
    {
        public ProgressService(CSharpSbDbContext context) : base(context) { }
      

        

        // Вход на уровень
        public override Response AddItem(Progress progress)
        {
            var res = ValidateAdd(progress);
            if (res.Status != StatusResp.OK) return res;

            progress.Status = Status.InProgress;
            progress.TimeStart = DateTime.Now;

            _context.Progresses.Add(progress);
            _context.SaveChanges();

            return Response.OK;

        }

        

        public Response PrevLevel(Progress progress)
        {
            var prevLevel = _context.Progresses.FirstOrDefault(x => x.LevelId == progress.LevelId - 1 && x.UserId == progress.UserId);
            return new Response<Progress>(StatusResp.OK, prevLevel);

        }

        protected override Response ValidateAdd(Progress progress)
        {
            var existUser = _context.Users.FirstOrDefault(x => x.Id == progress.UserId);
            if (existUser != null) { return new Response(StatusResp.ClientError, errors: "Несуществующий пользователь"); }

            var existlevel = _context.Levels.FirstOrDefault(x => x.Id == progress.LevelId);
            if (existlevel != null) { return new Response(StatusResp.ClientError, errors: "Несуществующий уровень"); }

            return Response.OK;
        }


       
    }
}
