using CSharpSbAPI.Data.Models.DB;

namespace CSharpSbAPI.Data.Models
{
    public  record Tip { public string? tiptext; }

    public record UserLevel
    {
        public int levelId;
        public int order;
        public string? name;
        public Status status;
    }
}
