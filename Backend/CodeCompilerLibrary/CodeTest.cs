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
		private const string codeWrapper = @"using System;
            using System.Collections.Generic;
            using System.Linq;
            using System.Text;
            using System.Threading.Tasks;
            
            public class Program 
            {{
            	public static void Main()
            	{{
            		{0}
            	}}
            
            	{1}
            }}";

		public static TestResult Test(string mainCode, string userCode, List<string> correct)
		{
			var result = new TestResult();
			try
			{
				var code = string.Format(codeWrapper, mainCode, userCode);
				var ass = cc.CreateAssembly(code);
				var outputs = new List<string>();
				using (StringWriter stringWriter = new StringWriter())
				{
					Console.SetOut(stringWriter);
					ass.EntryPoint?.Invoke(null, null);
					outputs.AddRange(stringWriter.ToString().TrimEnd('\r', '\n').Split("\r\n"));

					var standardOutput = new StreamWriter(Console.OpenStandardOutput());
					standardOutput.AutoFlush = true;
					Console.SetOut(standardOutput);
				}

				for (int i = 0; i < Math.Max(correct.Count(), outputs.Count); i++)
				{
					result.Outputs.Add(new Output(outputs[i] ?? "", correct[i] ?? "", (outputs[i] ?? "") == (correct[i] ?? "")));
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

	public class Output
	{
		public Output(string real, string expected, bool isCorrect)
		{
			Real = real;
			Expected = expected;
			IsCorrent = isCorrect;
		}

		public string Real { get; set; }
		public string Expected { get; set; }
		public bool IsCorrent { get; set; }
	}



	public class TestResult
	{
		public TestResult() { }

		public List<Output> Outputs { get; set; } = new List<Output>();

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
