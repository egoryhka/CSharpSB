using System.Diagnostics;

namespace CodeCompilerLibrary.Tests
{
	public static class Extentions
	{

		public static int GetLineNumber(this Exception ex)
		{
			var trace = new StackTrace(ex, true);
			var frame = trace.GetFrame(0);
			return frame?.GetFileLineNumber() ?? -1;
		}

		public static string[] GetInCommentUsings(this string s)
		{
			return s.Split(Environment.NewLine).Where(x => x.Trim().StartsWith("//using")).Select(x =>
			{
				var usingStr = x.Replace("//", "").Split(" ");
				return usingStr.Length >= 2 ? usingStr[1] : "";
			}).ToArray();
		}

	}
}
