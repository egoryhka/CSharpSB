﻿using CSharpSbAPI.Data;
using System.Linq;
using CSharpSbAPI.Data.Models.DB;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using CSharpSbAPI.Data.Models;
using System.Data.Entity;

namespace CSharpSbAPI.Services
{
	public class CourseService : CrudService<Course>
	{
		public CourseService(CSharpSbDbContext context) : base(context) { }


		public override Response GetAll()
		{
			return new Response<List<Course>>(StatusResp.OK, _context.Courses
				.Include(x => x.Users).ToList());
		}

		public override Response GetItem(int id)
		{
			var exist = _context.Courses.Include(x => x.Users).FirstOrDefault(x => x.Id == id);
			if (exist == null) return new Response(StatusResp.ClientError, errors: "Не найден");
			return new Response<Course>(StatusResp.OK, exist);
		}

		public Response AssignUser(int userId, int courseId)
		{
			var course = _context.Courses.Find(courseId);
			if (course == null) return new Response(StatusResp.ClientError, errors: "Курс не найден");

			var user = _context.Users.Find(userId);
			if (user == null) return new Response(StatusResp.ClientError, errors: "Пользователь не найден");

			if (_context.UserCourses.Any(x => x.UserId == userId && x.CourseId == courseId))
				return new Response(StatusResp.ClientError, errors: "Вы уже записаны на этот курс");

			_context.UserCourses.Add(new UserCourse
			{
				StartDate = DateTime.Now,
				UserId = user.Id,
				CourseId = course.Id
			});

			var firstLevel = _context.Levels
				.FirstOrDefault(x => x.CourseId == courseId && x.Order == _context.Levels
				.Where(x => x.CourseId == courseId)
				.Min(x => x.Order));

			if (firstLevel == null) return new Response(StatusResp.ClientError, errors: "На курсе нет уровней");

			_context.Progresses.Add(new Progress()
			{
				UserId = userId,
				LevelId = firstLevel.Id,
				TimeStart = DateTime.Now,
				Status = Status.InProgress
			});

			_context.SaveChanges();

			return Response.OK;
		}

		protected override Response ValidateAdd(Course course)
		{
			var exist = _context.Courses.FirstOrDefault(x => x.Name == course.Name);
			if (exist != null) return new Response(StatusResp.ClientError, errors: "Уже существует");
			return Response.OK;
		}

		protected override Response ValidateUpdate(Course course)
		{
			if (_context.Courses.Any(x => x.Name == course.Name)) return new Response(StatusResp.ClientError, errors: "Имя занято");
			return Response.OK;
		}

		public Response GetTips(int userId, int courseId)
		{
			var passLevelTips = _context.Progresses
				.Join(_context.Levels,
				p => p.LevelId,
				l => l.Id,
				(p, l) => new
				{
					levelId = p.LevelId,
					courseId = l.CourseId,
					status = p.Status,
					userId = p.UserId,
					tiptext = l.TipText
				})
				.Where(x => x.courseId == courseId && x.userId == userId)
				.Select(x => new Tip { tiptext = x.tiptext })
				.ToList();

			return new Response<List<Tip>>(StatusResp.OK, passLevelTips);
		}
	}
}
