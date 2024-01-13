using CSharpSbAPI.Data;
using CSharpSbAPI.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CSharpSbAPI.Services
{
	public abstract class CrudService<T> where T : class, IItem
	{
		protected readonly CSharpSbDbContext _context;

		public CrudService(CSharpSbDbContext context)
		{
			_context = context;
		}

		public virtual Response GetAll()
		{
			return new Response<List<T>>(StatusResp.OK, _context.Set<T>().ToList());
		}

		public virtual Response GetItem(int id)
		{
			var exist = _context.Set<T>().Find(id);
			if (exist == null) return new Response(StatusResp.ClientError, errors: "Не найден");
			return new Response<T>(StatusResp.OK, exist);
		}

		public virtual Response AddItem(T item)
		{
			var res = ValidateAdd(item);
			if (res.Status != StatusResp.OK) return res;

			_context.Set<T>().Add(item);
			_context.SaveChanges();

			return Response.OK;
		}

		public virtual Response UpdateItem(T item)
		{
			var exist = _context.Set<T>().Find(item.Id);
			if (exist == null) return new Response(StatusResp.ClientError, errors: "Не найден");

			var res = ValidateUpdate(item);
			if (res.Status != StatusResp.OK) return res;

			_context.Entry(exist).State = EntityState.Detached;
			_context.Set<T>().Update(item);
			_context.SaveChanges();
			return Response.OK;
		}

		public Response DeleteItem(int id)
		{
			var exist = _context.Set<T>().Find(id);
			if (exist == null) return new Response(StatusResp.ClientError, errors: "Не найден");

			var res = ValidateDelete(exist);
			if (res.Status != StatusResp.OK) return res;

			_context.Set<T>().Remove(exist);
			_context.SaveChanges();
			return Response.OK;
		}

		protected virtual Response ValidateAdd(T obj) => Response.OK;
		protected virtual Response ValidateUpdate(T obj) => Response.OK;
		protected virtual Response ValidateDelete(T obj) => Response.OK;

	}
}
