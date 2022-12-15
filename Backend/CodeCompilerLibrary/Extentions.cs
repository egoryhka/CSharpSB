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

    }
}
