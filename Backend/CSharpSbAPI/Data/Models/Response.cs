namespace CSharpSbAPI.Data.Models
{
    public class Response
    {
        public StatusCode Status { get; set; }
        public string? Error { get; set; }
        public string? Description { get; set; }
    }

    public enum StatusCode
    {
       
        OK = 200,
        ClientError = 400,
        ServerError = 500,
    }
}
