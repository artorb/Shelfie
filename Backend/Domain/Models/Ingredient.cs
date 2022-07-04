using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public sealed class Ingredient : Entity
{
    public double? Carbs { get; set; }
    public double? Fats { get; set; }
    public double? Proteins { get; set; }

    public double? Calories { get; set; }

    public int? Weight { get; set; }

    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}", ApplyFormatInEditMode = true)]
    public DateTime? ExpirationDate { get; set; }

    public string? Type { get; set; }

    [Required(ErrorMessage = "Ingredient name cannot be empty!")]
    [MinLength(2, ErrorMessage = "Minimum length: 2!")]
    [MaxLength(40, ErrorMessage = "Maximum length: 40!")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Amount cannot be empty!")]
    public int AmountUnits { get; set; }

    public string? Picture { get; set; }

    public string? ColorTag { get; set; } = Colors.SLATE;

    public bool Expired => ExpirationDate > DateTime.Now;

    [Required] public Guid? StorageId { get; set; }
    public Storage? Storage { get; set; }

    [Required] public string ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public ICollection<Recipe> Recipes { get; set; }
}