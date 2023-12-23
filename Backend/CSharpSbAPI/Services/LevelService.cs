using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;

namespace CSharpSbAPI.Services
{
    public class LevelService : CrudService<Level>
    {
        public LevelService(CSharpSbDbContext context) : base(context)
        {
        }

        public Response GetAll(int courseId)
        {
            var courseLevels = _context.Levels.Where(level => level.CourseId == courseId).ToList()
                .Select(l => new GetLevel(l, LevelStatus.Completed));
            var resp = new Response<IEnumerable<GetLevel>>(StatusResp.OK, courseLevels);
            // var resp = new Response<IEnumerable<GetLevel>>(StatusResp.OK,
            //     new[]
            //     {
            //         new GetLevel(new Level()
            //             { Name = "переменки", CourseId = 11, Description = "о переменки", Order = 1, Id = 1 }),
            //         new GetLevel(new Level()
            //             { Name = "Циклы", CourseId = 11, Description = "о циклы", Order = 2, Id = 2 }),
            //         new GetLevel(new Level()
            //             { Name = "функи", CourseId = 11, Description = "о функи", Order = 3, Id = 3 }),
            //         new GetLevel(new Level()
            //             { Name = "goto", CourseId = 11, Description = "о goto", Order = 4, Id = 4 }),
            //         new GetLevel(new Level()
            //         {
            //             Name = "декораторишки", CourseId = 11,
            //             Description = "о декораторишки декораторишки декораторишки", Order = 5, Id = 5
            //         })
            //     });

            return resp;
        }

        public Response AddLevel(AddLevel level, int courseId)
        {
            var course = _context.Courses.FirstOrDefault(x => x.Id == courseId);
            if (course is null) return new Response(StatusResp.ClientError, "Курс не найден");
            var res = ValidateAdd(level, courseId);
            if (res.Status != StatusResp.OK) return res;
            var newLevel = new Level()
            {
                Name = level.Name, HelpText = level.HelpText, Description = level.Description,
                ExpResultsJson = level.CompileResult
            };
            newLevel.Order = GetMaxOrder(courseId) + 1;
            newLevel.CourseId = courseId;
            _context.Levels.Add(newLevel);
            _context.SaveChanges();

            return Response.OK;
        }

        protected override Response ValidateUpdate(Level level)
        {
            if (_context.Levels.Any(x => x.Name == level.Name && x.Id != level.Id))
                return new Response(StatusResp.ClientError, errors: "Имя занято");
            return Response.OK;
        }

        protected Response ValidateAdd(AddLevel level, int courseId)
        {
            var exist = _context.Levels.FirstOrDefault(x => x.Name == level.Name && x.CourseId == courseId);
            if (exist != null)
                return new Response(StatusResp.ClientError, "Ошибка при создании уровня", errors: "уровень с таким именем уже существует");

            var course = _context.Courses.Find(courseId);
            if (course == null)
                return new Response(StatusResp.ClientError, "Ошибка при создании уровня",
                    errors: "указан несуществующий курс");
            return Response.OK;
        }

        public Response GetHelp(int id)
        {
            var help = _context.Levels.Find(id);
            if (help == null) return new Response(StatusResp.ClientError, "Ошибка при создании уровня", errors: "Не найден");
            return new Response<string?>(StatusResp.OK, help.HelpText);
        }

        public int GetMaxOrder(int courseId) => _context.Levels.Where(x => x.CourseId == courseId).Count();
    }
}