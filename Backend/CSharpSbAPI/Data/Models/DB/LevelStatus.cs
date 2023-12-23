using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSharpSbAPI.Data.Models.DB
{
	public enum LevelStatus
	{
		Admin,
		Current,
		Closed,
		Completed,
	}
}
