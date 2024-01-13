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
		private const string codeWrapper = @"
			using System;
            using System.Collections.Generic;
            using System.Linq;
            using System.Text;
            using System.Threading.Tasks;
            {0}

            public class Program 
            {{
            	public static void Main()
            	{{
            		{1}
            	}}
            
            	{2}
            }}";

		public static TestResult Test(string mainCode, string userCode, List<string> correct, params string[] usings)
		{
			var result = new TestResult();
			try
			{
				var optionalUsings =
					string.Join(Environment.NewLine, usings.Select(x => $"using {x};")) + Environment.NewLine +
					string.Join(Environment.NewLine, mainCode.GetInCommentUsings().Select(x => $"using {x};")) + Environment.NewLine +
					string.Join(Environment.NewLine, userCode.GetInCommentUsings().Select(x => $"using {x};"));

				var code = string.Format(codeWrapper, optionalUsings, mainCode, userCode);
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

				for (int i = 0; i < correct.Count(); i++)
				{
					var exp = correct[i] ?? "";
					var real = i < outputs.Count ? outputs[i] ?? "" : "";
					var compareRes = new Output(real, exp, exp == real);
					result.Outputs.Add(compareRes);
				}

				result.Status = result.Outputs.Any(x => !x.IsCorrect) ? TestResultStatus.Failure : TestResultStatus.Success;
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

					var mes = (line != -1 ? $"Строка:{line} -> " : "") + (ex.InnerException?.Message ?? ex.Message);
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
			IsCorrect = isCorrect;
		}

		public string Real { get; set; }
		public string Expected { get; set; }
		public bool IsCorrect { get; set; }
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
