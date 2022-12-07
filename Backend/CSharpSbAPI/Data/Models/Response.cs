namespace CSharpSbAPI.Data.Models
{
	public class Response
	{
		public Response(StatusResp status, string error = "", string description = "")
		{
			Status = status;
			Error = error;
			Description = description;
		}
		public StatusResp Status { get; set; }
		public string? Error { get; set; }
		public string? Description { get; set; }

		public static Response OK => new Response(StatusResp.OK);
	}

	public class Response<T> : Response
	{
		public Response(StatusResp status, T data, string error = "", string description = "") :
			base(status, error, description)
		{
			Status = status;
			Error = error;
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
