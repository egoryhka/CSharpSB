namespace CSharpSB.Models.DB
{
    public class Progress
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public int LevelId { get; set; }

        public string? Code { get; set; }   
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public bool HelpUsed { get; set; }
        public Status Status { get; set; }

    }
}
