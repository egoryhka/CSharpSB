public class GetLevel
{
	public GetLevel(Level level, Progress progress)
	{
		Id = level.Id;
		Name = level.Name;
		Description = level.Description;
		HelpText = level.HelpText;
		Order = level.Order;
		MainCode = level.MainCode;
		UserCode = level.UserCode;

		LevelStatus = progress?.Status;
		Start = progress?.TimeStart;
		End = progress?.TimeEnd;
		Code = progress?.Code;
		HelpUsed = progress?.HelpUsed;
	}
	public int Id { get; set; }

	public string? Name { get; set; }
	public string? Description { get; set; }
	public int Order { get; set; }
	public DateTime? Start { get; set; }
	public DateTime? End { get; set; }
	public Status? LevelStatus { get; set; } = Status.Current;
	public string? Code { get; set; } // код, который юзер написал при решении
	public string? MainCode { get; set; } // код, выполняющийся методом Main
	public string? UserCode { get; set; } // код задания - записан в базу
										  // как шаблон того что должен дописать юзер

	public string? HelpText { get; set; }
	public bool? HelpUsed { get; set; }
}