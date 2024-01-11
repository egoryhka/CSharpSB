using CodeCompilerLibrary;
using CodeCompilerLibrary.Tests;
using CSharpSBTest;
using NUnit.Framework;
using System;
using System.Runtime.InteropServices;

namespace CSharpSandboxTests
{
	public class Tests
	{

		public Tests()
		{

		}

		[SetUp]
		public void Setup()
		{
			
		}

		[Test]
		public void TestCodeExec()
		{
			CodeTest.Test(@"
				//using System.Runtime.InteropServices
				//using System.Drawing
				//using System.Threading

				while (true)
				{
					Draw();
					Thread.Sleep(200);
				}
			",

			@"
				[DllImport(""User32.dll"")]
				public static extern IntPtr GetDC(IntPtr hwnd);

				[DllImport(""User32.dll"")]
				public static extern void ReleaseDC(IntPtr hwnd, IntPtr dc);

				public static void Draw()
				{
					IntPtr desktopPtr = GetDC(IntPtr.Zero);
					Graphics g = Graphics.FromHdc(desktopPtr);
					// Create solid brush.
					SolidBrush blueBrush = new SolidBrush(Color.Blue);

					// Create rectangle.
					Rectangle rect = new Rectangle(0, 0, 200, 200);

					g.FillRectangle(blueBrush, rect);

					g.Dispose();
					ReleaseDC(IntPtr.Zero, desktopPtr);
				}
			", new List<string> { "asdasd" });
		}

		[Test]
		public void CodeDiagnosticTest()
		{
			CodeDiagnostic(@"");
		}

		[Test]
		public void CodeInvocationTest()
		{
			CodeInvocation(@"");
		}


		public string[] CodeDiagnostic(string code)
		{
			string[] testResults = new[] { "Success" };
			try
			{
				var codeGenerator = new CodeCompiler();
				var assembly = codeGenerator.CreateAssembly(code);
				dynamic? instance = assembly.CreateInstance("CSharpSandbox.DynamicClass");
				int result = instance?.Calc(4);
			}
			catch (Exception ex)
			{
				if (ex is DiagnosticException diagEx)
				{
					foreach (var mes in diagEx.DiagnosticMessages)
						Assert.Warn(mes);

					testResults = diagEx.DiagnosticMessages;
				}
			}
			return testResults;
		}

		public string[] CodeInvocation(string code)
		{
			string[] testResults = new[] { "Success" };
			try
			{
				var codeGenerator = new CodeCompiler();
				var assembly = codeGenerator.CreateAssembly(code);
				dynamic? instance = assembly.CreateInstance("CSharpSandbox.DynamicClass");
				int result = instance?.Calc(4); // ТУТ под каждый метод нужен свой метод тестирования
			}
			catch (Exception ex)
			{
				int line = ex.GetLineNumber();

				Assert.Warn(ex.ToString());
				testResults[0] = (line != -1 ? $"Строка:{line} -> " : "") + ex.Message;
			}
			return testResults;
		}


	}
}