using CSharpSbAPI.Data.Models;
using CSharpSbAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.Configuration;
using CSharpSbAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace CSharpSbAPI
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddControllers();

			// EntityFramework
			builder.Services.AddDbContext<CSharpSbDbContext>(options =>
			options.UseSqlServer(builder.Configuration.GetConnectionString("CSharpSbDbConnectionString")));

			// Swagger
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			// Cors
			builder.Services.AddCors(options =>
			{
				options.AddDefaultPolicy(
					policy =>
					{
						policy.AllowAnyHeader();
						policy.AllowAnyMethod();
						policy.AllowAnyOrigin();
					});
			});

			// Authorization
			builder.Services.AddAuthorization();
			builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.RequireHttpsMetadata = false;
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidIssuer = AuthOptions.ISSUER,
						ValidateAudience = true,
						ValidAudience = AuthOptions.AUDIENCE,
						ValidateLifetime = false,
						IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
						ValidateIssuerSigningKey = true,
					};
				});

			// CSharpSbServices . . .
			builder.Services.AddScoped<AccountService>();
			builder.Services.AddScoped<CourseService>();
            builder.Services.AddScoped<LevelService>();

			builder.Services.AddScoped<ExampleService>();



			// --------------------------------------------------
			var app = builder.Build();

			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseStaticFiles();

			app.UseRouting();

			app.UseCors();

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseHttpsRedirection();

			app.MapControllers();

			app.Run();
		}
	}
}