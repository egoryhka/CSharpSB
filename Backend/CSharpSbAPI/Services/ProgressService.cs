using CSharpSbAPI.Data;

namespace CSharpSbAPI.Services
{
    public class ProgressService
    {
        private readonly CSharpSbDbContext _context;

        public ProgressService(CSharpSbDbContext context)
        {
            _context = context;
        }

        #region CRUD Operation
        public void Add(int levelId, int  userId)
        {

            _context.Progresses.Add(new()
            {
                LevelId = levelId,
                UserId = userId,
            }) ;
            _context.SaveChanges();
        }

        public void Delete(int progressId) => _context.Progresses.Remove(_context.Progresses.Find(progressId));


        #endregion
    }
}
