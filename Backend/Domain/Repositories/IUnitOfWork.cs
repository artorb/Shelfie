namespace Domain.Repositories;

public interface IUnitOfWork : IDisposable
{
    IRecipeRepository RecipeRepository { get; }
    IIngredientRepository IngredientRepository { get; }
    
    IStorageRepository StorageRepository { get; }
    Task CompleteAsync();
}