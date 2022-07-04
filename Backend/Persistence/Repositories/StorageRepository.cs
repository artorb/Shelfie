using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Persistence.DTO;

namespace Persistence.Repositories;

public class StorageRepository : GenericRepository<Storage>, IStorageRepository
{
    public StorageRepository(ShelfyContext context) : base(context)
    {
    }
}