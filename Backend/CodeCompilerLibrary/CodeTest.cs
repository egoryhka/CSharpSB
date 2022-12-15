using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CodeCompilerLibrary.Tests
{
	public static class CodeTest
	{
		private static CodeCompiler cc = new CodeCompiler();
		private static string codeWrapper => File.ReadAllText(Directory.GetParent(Assembly.GetCallingAssembly().Location) + @"\CodeWrapper.txt");


		public static TestResult Test(string mainCode, string userCode, IEnumerable<string> correct)
		{
			var result = new TestResult();
			try
			{
				var code = string.Format(codeWrapper, mainCode, userCode);
				var ass = cc.CreateAssembly(code);

				using (StringWriter stringWriter = new StringWriter())
				{
					Console.SetOut(stringWriter);
					ass.EntryPoint?.Invoke(null, null);
					result.Outputs.AddRange(stringWriter.ToString().TrimEnd('\r', '\n').Split("\r\n"));

                    var standardOutput = new StreamWriter(Console.OpenStandardOutput());
                    standardOutput.AutoFlush = true;
                    Console.SetOut(standardOutput);
                }
				
				result.Status = TestResultStatus.Success;
			}
			catch (Exception ex)
			{
				result.Status = TestResultStatus.Error;

				if (ex is DiagnosticException dex)
				{
					foreach (var mes in dex.DiagnosticMessages)
						result.Errors.Add(mes);
				}
				else
				{
					int line = ex.InnerException?.GetLineNumber() ?? ex.GetLineNumber();

					var mes = (line != -1 ? $"Строка:{line} -> " : "") + ex.InnerException?.Message ?? ex.Message;
					result.Errors.Add(mes);
				}

			}

			return result;
		}


	}

	public class TestResult
	{
		public TestResult() { }

		public List<string> Outputs { get; set; } = new List<string>();

		public List<string> Errors { get; set; } = new List<string>();

		[JsonConverter(typeof(JsonStringEnumConverter))] public TestResultStatus Status { get; set; }
	}

	public enum TestResultStatus
	{
		Error,
		Failure,
		Success,
	}
}
