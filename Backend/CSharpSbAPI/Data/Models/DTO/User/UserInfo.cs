namespace CSharpSbAPI.Data.Models.DTO;

public class UserInfo
{
    public UserInfo(User user)
    {
        Name = user.Name;
        Surname = user.Surname;
        Email = user.Email;
    }
    public string? Name { get; }
    public string? Surname { get; }
    public string? Email { get; }
}