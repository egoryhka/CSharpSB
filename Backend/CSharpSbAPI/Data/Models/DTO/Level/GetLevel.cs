public class GetLevel
{
	public GetLevel(Level level, Progress progress)
	{
		Id = level.Id;
		Name = level.Name;
		Description = level.Description;
		HelpText = level.HelpText;
		Order = level.Order;
		LevelStatus = progress.Status;
		Start = progress.TimeStart;
		End = progress.TimeEnd;
		Code = progress.Code;
		HelpUsed = progress.HelpUsed;
	}
	public int Id { get; set; }

	public string? Name { get; set; }
	public string? Description { get; set; }
	public int Order { get; set; }
	public DateTime Start { get; set; }
	public DateTime End { get; set; }
	public Status LevelStatus { get; set; } = Status.Current;
	public string Code { get; set; }
	public bool HelpUsed { get; set; }

	public string? HelpText { get; set; }
}