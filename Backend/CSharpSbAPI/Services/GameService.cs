using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Data.Models.DB;

namespace CSharpSbAPI.Services
{
    public class GameService
    {
        private readonly CSharpSbDbContext _context;


        private readonly LevelService _levelService;
        private readonly CourseService _courseService;
        private readonly ProgressService _progressService;
        private readonly AccountService _accountService;


        public GameService(LevelService levelService, CourseService courseService, ProgressService progressService, AccountService accountService)
        {
            _levelService = levelService;
            _courseService = courseService;
            _progressService = progressService;
            _accountService = accountService;
        }

        //Переход чела на уровень после записи на курс

       

        //Отправка кода на проверку

        //public Response TestCode() 
        //{
        //    return  StatusResp.OK;
        //}

        ////Переход на новый уровень


        //public Response CheckLevelCount(int courseId, int userId) 
        //{
        //    var alllevels = _levelService.GetAll();
        //    var needLevels = ((Response<List<Level>>)alllevels).Data.Where(x => x.CourseId == courseId);

        //    var userLevels = _progressService.GetItem(userId);

            
        //}


        //Метод захода на курс, где мы будем проверять количество записей
        //в табилце прогресса и в таблице курсов кол-во уровней(запускать апдейт прогресса) и кол-во уровней для конкретного юзера


    }
}
