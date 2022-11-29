using CSharpSandboxTests;
using Microsoft.AspNetCore.Mvc;

namespace CSharpSB.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(string methodContent)
        {
            ViewBag.MethodContent = methodContent;

            Tests tests = new Tests();
            tests.Setup();

            var code =
                @$"
                using System;

                namespace CSharpSandbox
                {{
                    public class DynamicClass
                    {{
                        public int Calc(int n)
                        {{      
                            {methodContent /*Код с клиента*/}
                        }}
                    }}
                }}";

            //  Console.WriteLine("adasdasdadasdasd"); return n;


            var testResults = tests.CodeDiagnostic(code);
            if (testResults[0] != "Success") return View(testResults);

            testResults = tests.CodeInvocation(code);
            return View(testResults);
        }



    }
}