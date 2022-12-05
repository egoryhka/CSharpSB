using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CSharpSB.Controllers
{
    public class LevelController : Controller
    {
        public LevelController() 
        
        {

        }    

        public ActionResult Index()
        {
            return View();
        }

        //Кнопка назад к выбору уровней 
        public ActionResult Back() 
        {
            return RedirectToAction("Index");
        }

        //Кнопка перехода на новый уровень
        public ActionResult GetNextLevel(int levelid) 
        {
            return View();
        }

        [HttpPost]
        // Получить подсказку по уровню
        public ActionResult GetHelp(int id) 
        {
            return View();
        }
        //Очистка написанного пользователем кода, остается тольео захардкоженный
        public ActionResult RemoveCod() 
        {
            return View();
        }
    }
}
