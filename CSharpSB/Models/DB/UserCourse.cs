using System.ComponentModel.DataAnnotations.Schema;

namespace CSharpSB.Models.DB
{
    public class UserCourse
    { 
        public User User { get; set; }
        public int UserId { get; set; }


        public Course Course { get; set; }
        public int CourseId { get; set; }

        public DateTime StartDate { get; set; }
    }
}
