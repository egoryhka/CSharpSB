namespace CSharpSbAPI.Data.Models.DB
{
    public class Help
    {   
        public int Id { get; set; }
        public int LevelId { get; set; }

        public string? Text { get; set; }
        public int TimeOut { get; set; }
    }
}
