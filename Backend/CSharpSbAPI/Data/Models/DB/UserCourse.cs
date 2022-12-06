using System.ComponentModel.DataAnnotations.Schema;

namespace CSharpSbAPI.Data.Models.DB
{
    public class UserCourse
    {
        public User User { get; set; } = null!;
        public int UserId { get; set; }


        public Course Course { get; set; } = null!;
        public int CourseId { get; set; }

        public DateTime StartDate { get; set; }
    }
}
