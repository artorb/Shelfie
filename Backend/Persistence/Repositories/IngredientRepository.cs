using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Persistence.DTO;

namespace Persistence.Repositories;

public class IngredientRepository : GenericRepository<Ingredient>, IIngredientRepository
{
    public IngredientRepository(ShelfyContext context) : base(context)
    {
    }
}