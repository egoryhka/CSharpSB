﻿using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;
using Newtonsoft.Json;

namespace CSharpSbAPI.Services
{
    public class HelpService
    {
        private readonly CSharpSbDbContext _context;

        public HelpService(CSharpSbDbContext context)
        {
            _context = context;
        }

        #region CRUD Operation
        public void Add(string text, int timeout, int levelId)
        {

            _context.Helps.Add(new()
            {
                Text = text,
                 TimeOut = timeout, 
                  Id = levelId
            });
            _context.SaveChanges();
        }

        public void Delete(int helpId) => _context.Helps.Remove(_context.Helps.Find(helpId));


        //public Response Update(int helpId, string text, int timeout) 
        //{
        //    var help = _context.Helps.FirstOrDefault(x => x.Id == helpId);

        //    if (help == null)
        //        return new Response { Status = Data.Models.StatusResp.ClientError, Error = "Такой подсказки нет" };

        //    help.Text = text;
        //    help.TimeOut = timeout;
        //    _context.Helps.Update(help);
        //    _context.SaveChanges();
        //    return new Response { Status = Data.Models.StatusResp.OK };
        //}
        #endregion

        public string Get(int levelId) 
        {
           
            var curerntHelp = _context.Helps
                .Where(x => x.LevelId == levelId)
                .Select(x=> x.LevelId);

            return JsonConvert.SerializeObject(curerntHelp);
        }
    }
}