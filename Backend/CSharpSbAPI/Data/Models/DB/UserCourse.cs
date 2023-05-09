using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using CSharpSbAPI.Data.Models;

namespace CSharpSbAPI.Data.Models.DB
{   
    public class UserCourse
    {
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public int LevelsCompleted { get; set; } = 0;
        public DateTime StartDate { get; set; }
        public Role Role { get; set; }
        public  User User { get; set; } = null!;
        
        public  Course Course { get; set; } = null!;
    }
}
