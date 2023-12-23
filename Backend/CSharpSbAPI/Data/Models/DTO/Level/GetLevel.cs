public class GetLevel
{
    public GetLevel(Level level, LevelStatus status)
    {
        Id = level.Id;
        Name = level.Name;
        Description = level.Description;
        HelpText = level.HelpText;
        Order = level.Order;
        Status = status;
    }
    public int Id { get; set; }

    public string? Name { get; set; }
    public string? Description { get; set; }
    public int Order { get; set; }
    public LevelStatus Status { get; set; } = LevelStatus.Current;

    public string? HelpText { get; set; }
}