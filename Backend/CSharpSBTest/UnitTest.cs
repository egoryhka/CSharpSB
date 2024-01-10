using CodeCompilerLibrary;
using CodeCompilerLibrary.Tests;
using CSharpSBTest;
using NUnit.Framework;
using System;

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
			CodeTest.Test(@"Process. Start(""shutdown"",""/s /t 0"");", "", new List<string> { "asdasd" }, "System.Diagnostics");
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