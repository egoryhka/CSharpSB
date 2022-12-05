using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace CSharpSB.Controllers
{
    [Authorize(Roles = "User")]
    public class AccountController : Controller
    {
        public AccountController() 
        {

        }  
   
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        
        [HttpGet]
        public ActionResult GetInfo() 
        {
            return View();
        }
    }
}
