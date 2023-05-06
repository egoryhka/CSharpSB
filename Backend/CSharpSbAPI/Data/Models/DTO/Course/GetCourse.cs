
public class GetCourse
{
    public GetCourse(Course course, Role role, User? owner, List<User> admins, List<User> partisipants)
    {
        Name = course.Name;
        Description = course.Description;
        Admins = admins.Select(admin => new UserInfo(admin));
        Participants = partisipants.Select(partisipant => new UserInfo(partisipant));
        Owner = owner;
        Role = role;
    }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public User? Owner { get; set; }
    public Role? Role { get; set; }
    public IEnumerable<UserInfo> Admins { get; set; } = new List<UserInfo>();
    public IEnumerable<UserInfo> Participants { get; set; } = new List<UserInfo>();
}