
public class GetUserCoursesInfo
{
    public GetUserCoursesInfo(int countInPage, decimal totalCount, List<GetUserCoursesList> courses)
    {
        CountInPage = countInPage;
        TotalCount = totalCount;
        TotalPages = Math.Floor(Convert.ToDecimal(totalCount / countInPage));
        Courses = courses;
    }
    
    public decimal TotalPages { get; set; }
    public decimal TotalCount { get; set; }
    public decimal CountInPage { get; set; }
    public List<GetUserCoursesList> Courses { get; set; }
}

public class GetUserCoursesList
{
    public GetUserCoursesList(UserCourse uc)
    {
        StartDate = uc.StartDate;
        Role = uc.Role;
        Name = uc.Course.Name;
        CourseId = uc.CourseId;
    }

    public DateTime StartDate { get; set; }
    public Role Role { get; set; }
    public string Name { get; set; }
    public int CourseId { get; set; }
}