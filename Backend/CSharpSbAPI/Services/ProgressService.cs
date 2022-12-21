using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models.DB;
using CSharpSbAPI.Data.Models;
using System;
using Microsoft.EntityFrameworkCore;

namespace CSharpSbAPI.Services
{
    public class ProgressService
    {
        private readonly CSharpSbDbContext _context;
        public ProgressService(CSharpSbDbContext context)
        {
            _context = context;
        }

        public Response Add(Progress progress)
        {
            var res = Validate(progress);
            if (res.Status != StatusResp.OK) return res;

            progress.Status = Status.InProgress;
            progress.TimeStart = DateTime.Now;
            _context.Progresses.Add(progress);
            _context.SaveChanges();
            return Response.OK;
        }
        
        public Response Update(Progress progress)
        {
            var res = Validate(progress);
            if (res.Status != StatusResp.OK) return res;

            _context.Entry(progress).State = EntityState.Detached;
            _context.Progresses.Update(progress);
            _context.SaveChanges();
            return Response.OK;
        }

        private Response Validate(Progress progress)
        {
            var existUser = _context.Users.FirstOrDefault(x => x.Id == progress.UserId);
            if (existUser != null) { return new Response(StatusResp.ClientError, errors: "Несуществующий пользователь"); }

            var existlevel = _context.Levels.FirstOrDefault(x => x.Id == progress.LevelId);
            if (existlevel != null) { return new Response(StatusResp.ClientError, errors: "Несуществующий уровень"); }

            return Response.OK;
        }
    }
}
