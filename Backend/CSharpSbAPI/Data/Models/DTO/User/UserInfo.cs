namespace CSharpSbAPI.Data.Models.DTO;

public class UserInfo
{
    public UserInfo(User user)
    {
        Name = user.Name;
        Surname = user.Surname;
        Email = user.Email;
        Login = user.Login;
        Id = user.Id;
    }
    public string? Name { get; }
    public string? Surname { get; }
    public string? Email { get; }
    public string? Login { get; }
    public int? Id { get; }
}