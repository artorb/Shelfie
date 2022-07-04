using Domain.Models;
using Domain.Repositories;

namespace Persistence.Repositories;

public class RecipeRepository : GenericRepository<Recipe>, IRecipeRepository
{
    public RecipeRepository(ShelfyContext context) : base(context)
    {
    }
}