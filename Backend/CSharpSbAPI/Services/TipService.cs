using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CSharpSbAPI.Services
{
    public class TipService
    {
        private readonly CSharpSbDbContext _context;

        public TipService(CSharpSbDbContext context)
        {
            _context = context;
        }

        #region CRUD Operation
        public void Add(int levelId, string text)
        {
            _context.Tips.Add(new()
            {
                Text = text,
                LevelId = levelId
            });
            _context.SaveChanges();
        }

        //public Response Update(int levelId, string text, int tipId)
        //{
        //    var tip = _context.Tips.FirstOrDefault(x => x.Id == tipId);

        //    if (tip == null)
        //        return new Response { Status = Data.Models.StatusResp.ClientError, Error = "Такой подсказки нет" };

        //    tip.Text = text;
        //    tip.LevelId = levelId;
        //    _context.Tips.Update(tip);
        //    _context.SaveChanges();
        //    return new Response { Status = Data.Models.StatusResp.OK };
        //}

        //public Response Delete(int tipId) 
        //{
        //    var tip = _context.Tips.FirstOrDefault(x => x.Id == tipId);
        //    if (tip == null) return new Response { Status = Data.Models.StatusResp.ClientError, Error = "Такой подсказки нет"};

        //    _context.Tips.Remove(tip);
        //    _context.SaveChanges();
        //    return new Response { Status = Data.Models.StatusResp.OK };
        //}


        #endregion 
    }
}
