
public class GetCourse
{
    public GetCourse(Course course, Role role, User? owner, List<User> admins, int partisipants)
    {
        Name = course.Name;
        Description = course.Description;
        Admins = admins.Select(admin => new UserInfo(admin));
        ParticipantsCount = partisipants;
        Owner = new UserInfo(owner);
        Role = role;
    }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public UserInfo? Owner { get; set; }
    public Role? Role { get; set; }
    public IEnumerable<UserInfo> Admins { get; set; } = new List<UserInfo>();
    public int? ParticipantsCount { get; set; } = 0;
}