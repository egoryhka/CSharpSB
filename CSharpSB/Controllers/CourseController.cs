using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CSharpSB.Controllers
{
    public class CourseController : Controller
    {
        public CourseController() { }   

 
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        //Перейти на курс, если он начат
        public ActionResult CourseEnter(int courseid)
        {
            return View();
        }

        //Записаться на новый курс
        public ActionResult StartCourse(int courseid) 
        {
            return View();

        }
         
        

            
    }
}
