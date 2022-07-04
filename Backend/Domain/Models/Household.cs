using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public sealed class Household : Entity
{
    [Required] public string Name { get; set; }
    
    public ICollection<ApplicationUser> Users { get; set; }
    public ICollection<Storage> Storages { get; set; }
    public ICollection<Recipe> Recipes { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }
}