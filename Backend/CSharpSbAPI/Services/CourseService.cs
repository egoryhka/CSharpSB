﻿using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using System.Data.Entity;

namespace CSharpSbAPI.Services
{
    public class CourseService : CrudService<Course>
    {
        public CourseService(CSharpSbDbContext context) : base(context)
        {
        }


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
                CourseId = course.Id,
                Role = Role.Participant
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

        public Response AddCourse(AddCourse course, int ownerId)
        {
            var owner = _context.Users.FirstOrDefault(user => user.Id == ownerId);

            if (owner is null)
            {
                return new Response(StatusResp.ClientError, "");
            }

            var newCourse = new Course
            {
                Description = course.Description,
                Name = course.Name,
            };

            _context.Courses.Add(newCourse);
            _context.SaveChanges();
            
            _context.UserCourses.Add(new UserCourse
            {
                StartDate = DateTime.Now,
                User = owner,
                Course = newCourse,
                Role = Role.Owner
            });
            
            _context.SaveChanges();

            return new Response<int>(StatusResp.OK, newCourse.Id);
        }

        public Response GetCourse(int courseId, int? userId)
        {
            var course = _context.Courses.FirstOrDefault(course => courseId == course.Id);
            var userRole = userId != 0 ? _context.UserCourses.FirstOrDefault(uc => uc.CourseId == courseId && uc.UserId == userId).Role : Role.Guest;
            var users = _context.UserCourses.Where(uc => uc.CourseId == courseId);
            var admins = users.Where(uc => uc.CourseId == courseId && uc.Role == Role.Admin).Select(uc => uc.User).ToList();
            var participants = users.Where(uc => uc.CourseId == courseId && uc.Role == Role.Participant).Select(uc => uc.User).ToList();
            
            var owner = _context.UserCourses.FirstOrDefault(uc => uc.CourseId == courseId && uc.Role == Role.Owner).User;
            
            var DTOCourse = new GetCourse(course, userRole, owner, admins, participants);
            //TODO - Егор позырь плиз
            //TODO - не тянется owner (у всех юзеров на юзеркурсе - null)

            return new Response<GetCourse>(StatusResp.OK, DTOCourse);
        }

        protected override Response ValidateAdd(Course course)
        {
            var exist = _context.Courses.FirstOrDefault(x => x.Name == course.Name);
            if (exist != null) return new Response(StatusResp.ClientError, errors: "Уже существует");
            return Response.OK;
        }

        protected override Response ValidateUpdate(Course course)
        {
            if (_context.Courses.Any(x => x.Name == course.Name))
                return new Response(StatusResp.ClientError, errors: "Имя занято");
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