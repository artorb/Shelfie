using System.Linq.Expressions;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Persistence.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : Entity
{
    private readonly ShelfyContext db = null;
    private readonly DbSet<T> table = null;

    public GenericRepository(ShelfyContext context)
    {
        db = context ?? throw new ArgumentNullException(nameof(db));
        table = db.Set<T>();
    }

    public virtual async Task<T> GetByIdWithIncludesAsync(Guid id,
        params Func<IQueryable<T>, IIncludableQueryable<T, object>>[] includes)
    {
        IQueryable<T> queryable = db.Set<T>();

        queryable = includes.Where(inc => inc != null).Aggregate(queryable, (current, inc) => inc(current));

        return await queryable.FirstOrDefaultAsync(a => a.Id.Equals(id));
    }

    public virtual async Task<T> GetWithIncludesAsyncTest(Guid id,
        params Func<IQueryable<T>, IIncludableQueryable<T, object>>[] includes)
    {
        IQueryable<T> queryable = db.Set<T>();

        queryable = includes.Where(inc => inc != null).Aggregate(queryable, (current, inc) => inc(current));

        return await queryable.FirstOrDefaultAsync(a => a.Id == id);
    }


    public virtual async Task<IEnumerable<T>> GetWithIncludesAsync(
        Func<IQueryable<T>, IIncludableQueryable<T, object>>? includes = null)
    {
        IQueryable<T> queryable = db.Set<T>();

        if (includes != null)
        {
            queryable = includes(queryable);
        }

        return await queryable.ToListAsync();
    }


    public virtual void Add(T obj)
    {
        db.Add(obj);
    }


    public virtual async Task<bool> AnyAsync(Guid? id)
    {
        return await table.AnyAsync(g => g.Id == id);
    }


    public virtual async Task<T> FindAsync(Guid? id)
    {
        return await table.FindAsync(id);
    }


    public virtual async Task<T> GetAsync(Guid id)
    {
        return await table.FirstOrDefaultAsync(p => p.Id == id);
    }


    public virtual async Task<T> GetWithIncludesIdAsync(Guid id, params Expression<Func<T, object>>[] includeProperties)
    {
        IQueryable<T> query = table;
        foreach (var include in includeProperties)
        {
            await query.Include(include).LoadAsync();
        }

        return await query.FirstOrDefaultAsync(p => p.Id == id);
    }


    public virtual async Task<IEnumerable<T>> GetAllWithIncludesAsync(
        params Expression<Func<T, object>>[] includeProperties)
    {
        IQueryable<T> query = table;

        foreach (var include in includeProperties)
        {
            await query.Include(include).LoadAsync();
        }

        return await query.ToListAsync();
    }


    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await table.ToListAsync();
    }


    public virtual void Remove(T obj)
    {
        table.Remove(obj);
    }


    public virtual void Update(T obj)
    {
        table.Update(obj);
    }
}