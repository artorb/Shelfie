using Domain.Repositories;

namespace Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ShelfyContext db;

    public IRecipeRepository RecipeRepository { get; }
    public IIngredientRepository IngredientRepository { get; }
    public IStorageRepository StorageRepository { get; }

    public UnitOfWork(ShelfyContext db)
    {
        this.db = db;
        RecipeRepository = new RecipeRepository(db);
        IngredientRepository = new IngredientRepository(db);
        StorageRepository = new StorageRepository(db);
    }

    public async Task CompleteAsync()
    {
        await db.SaveChangesAsync();
    }

    public void Dispose() => db.Dispose();
}