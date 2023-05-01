namespace CSharpSbAPI.Data.Models.DTO;

public enum ProgrammingLanguage
{
    CSharp,
    JS
}

public class AddCourse
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public ProgrammingLanguage? Language { get; set; }
}