using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.CodeAnalysis.Text;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;

namespace CodeCompilerLibrary
{
	public class CodeCompiler
	{
		private readonly List<MetadataReference> references = new List<MetadataReference>();

		/// <summary>
		/// If neededAssemblies is empty - use All possible references from TRUSTED_PLATFORM_ASSEMBLIES
		/// </summary>
		public CodeCompiler(params string[] neededAssemblies)
		{
			var trustedAssembliesPaths = ((string)AppContext.GetData("TRUSTED_PLATFORM_ASSEMBLIES")).Split(Path.PathSeparator);

			trustedAssembliesPaths
				.Where(p => neededAssemblies.Length == 0 || neededAssemblies.Contains(Path.GetFileNameWithoutExtension(p)))
				.Select(x => x).ToList().ForEach(p => references.Add(MetadataReference.CreateFromFile(p)));
		}

		public Assembly CreateAssembly(string code)
		{
			var encoding = Encoding.UTF8;

			var assemblyName = Path.GetRandomFileName();
			var symbolsName = Path.ChangeExtension(assemblyName, "pdb");
			var sourceCodePath = "generated.cs";

			var buffer = encoding.GetBytes(code);
			var sourceText = SourceText.From(buffer, buffer.Length, encoding, canBeEmbedded: true);

			var syntaxTree = CSharpSyntaxTree.ParseText(
				sourceText,
				new CSharpParseOptions(),
				path: sourceCodePath);

			var syntaxRootNode = syntaxTree.GetRoot() as CSharpSyntaxNode;
			var encoded = CSharpSyntaxTree.Create(syntaxRootNode!, null, sourceCodePath, encoding);

			var optimizationLevel = OptimizationLevel.Debug;

			CSharpCompilation compilation = CSharpCompilation.Create(
				assemblyName,
				syntaxTrees: new[] { encoded },
				references: references,
				options: new CSharpCompilationOptions(OutputKind.ConsoleApplication)
					.WithOptimizationLevel(optimizationLevel)
					.WithPlatform(Platform.AnyCpu)
			);

			using var assemblyStream = new MemoryStream();
			using var symbolsStream = new MemoryStream();

			var emitOptions = new EmitOptions(
					debugInformationFormat: DebugInformationFormat.PortablePdb,
					pdbFilePath: symbolsName);

			var embeddedTexts = new List<EmbeddedText> { EmbeddedText.FromSource(sourceCodePath, sourceText), };

			EmitResult result = compilation.Emit(
				peStream: assemblyStream,
				pdbStream: symbolsStream,
				embeddedTexts: embeddedTexts,
				options: emitOptions);

			if (!result.Success)
			{
				var errors = new List<string>();

				IEnumerable<Diagnostic> failures = result.Diagnostics.Where(diagnostic =>
					diagnostic.IsWarningAsError ||
					diagnostic.Severity == DiagnosticSeverity.Error);

				foreach (Diagnostic diagnostic in failures)
					errors.Add($"Строка:{diagnostic.Location.GetLineSpan().StartLinePosition.Line} -> {diagnostic.Id}: {diagnostic.GetMessage()}");

				throw new DiagnosticException(errors);
			}

			assemblyStream.Seek(0, SeekOrigin.Begin);
			symbolsStream?.Seek(0, SeekOrigin.Begin);

			var assembly = AssemblyLoadContext.Default.LoadFromStream(assemblyStream, symbolsStream);

			var asSecurity = assembly.IsFullyTrusted;
			return assembly;
		}

	}

	public class DiagnosticException : Exception
	{
		public string[] DiagnosticMessages { get; private set; }
		public DiagnosticException(IEnumerable<string> messages)
		{
			DiagnosticMessages = messages.ToArray();
		}
	}
}