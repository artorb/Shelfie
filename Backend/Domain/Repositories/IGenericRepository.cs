using System.Linq.Expressions;
using Domain.Models;
using Microsoft.EntityFrameworkCore.Query;

namespace Domain.Repositories;

public interface IGenericRepository<T> where T : Entity
{
    Task<T> GetByIdWithIncludesAsync(Guid id,
        params Func<IQueryable<T>, IIncludableQueryable<T, object>>[] includes);

    Task<T> GetWithIncludesAsyncTest(Guid id, params Func<IQueryable<T>, IIncludableQueryable<T, object>>[] includes);

    Task<IEnumerable<T>> GetWithIncludesAsync(Func<IQueryable<T>, IIncludableQueryable<T, object>>? includes);

    Task<IEnumerable<T>> GetAllWithIncludesAsync(params Expression<Func<T, object>>[] includeProperties);

    Task<T> GetWithIncludesIdAsync(Guid id, params Expression<Func<T, object>>[] includeProperties);

    Task<IEnumerable<T>> GetAllAsync();

    Task<T> FindAsync(Guid? id);

    Task<bool> AnyAsync(Guid? id);

    Task<T> GetAsync(Guid id);

    void Add(T obj);

    void Update(T obj);

    void Remove(T obj);
}