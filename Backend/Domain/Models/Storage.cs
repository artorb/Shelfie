using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public sealed class Storage : Entity
{
    public string Name { get; set; }


    [Required]
    public string ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }

    public ICollection<Ingredient> Ingredients { get; set; }
}