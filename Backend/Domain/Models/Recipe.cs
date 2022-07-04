using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public sealed class Recipe : Entity
{
    public string Name { get; set; }
    public string? Category { get; set; }

    /// <summary>
    /// The grams and steps needed to produce a certain meal
    /// </summary>
    [Required]
    public string ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }

    public ICollection<Note> Notes { get; set; }
}