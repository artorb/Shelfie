using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Domain.Models;

public class ApplicationUser : IdentityUser
{
    [Required(ErrorMessage = "Please enter name!")]
    [MinLength(2, ErrorMessage = "Minimum length: 2 character!")]
    [MaxLength(40, ErrorMessage = "Maximum length: 40 character!")]
    [RegularExpression("[-a-zA-Z]+", ErrorMessage = "Invalid name!")]
    public string Name { get; set; }

    // public Household Household { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }
    public ICollection<Storage> Storages { get; set; }
    public ICollection<Recipe> Meals { get; set; }
}