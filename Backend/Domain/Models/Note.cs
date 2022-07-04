using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public class Note : Entity
{
    public Guid RecipeId { get; set; }
    [Required]
    public Recipe Recipe { get; set; }

    public string Text { get; set; }
}