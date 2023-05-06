public class GetLevel
{
    public GetLevel(Level level)
    {
        Id = level.Id;
        Name = level.Name;
        Description = level.Description;
        HelpText = level.HelpText;
        Order = level.Order;
    }
    public int Id { get; set; }

    public string? Name { get; set; }
    public string? Description { get; set; }
    public int Order { get; set; }

    public string? HelpText { get; set; }
}