namespace CSharpSbAPI.Data.Models.DB
{
    public class Level : IItem
	{
        public int Id { get; set; }
        public int CourseId { get; set; }

        public string? Name { get; set; }
		public int Order { get; set; }

		public string? Description { get; set; }
		public string? MainCode { get; set; }
		public string? UserCode { get; set; }

        public string? HelpText { get; set; }

        public string? TipText { get; set; }

        public string? ExpResultsJson { get; set; }

    }
}
