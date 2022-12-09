namespace CSharpSbAPI.Data.Models
{
	public class Response
	{
		public Response(StatusResp status,  string description = "", params string[] errors )
		{
			Status = status;
			Errors = errors;
			Description = description;
		}
		public StatusResp Status { get; set; }
		public string[] Errors { get; set; }
		public string? Description { get; set; }


		public static Response OK => new Response(StatusResp.OK);
	}

	public class Response<T> : Response
	{
		public Response(StatusResp status, T data, string description = "", params string[] errors) :
			base(status,  description, errors)
		{
			Status = status;
			Errors = errors;
			Description = description;
			Data = data;
		}

		public T Data { get; set; }
	}

	public enum StatusResp
	{
		OK = 200,
		ClientError = 400,
		ServerError = 500,

	}
}
