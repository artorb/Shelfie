using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Persistence.DTO.Ingredient;

public class PutIngredientDto
{
    public string? Name { get; set; }
    public string? Picture { get; set; }
    public double? Calories { get; set; }
    public double? Carbs { get; set; }
    public double? Proteins { get; set; }
    public int? Weight { get; set; }
    public int? AmountUnits { get; set; }
    public double? Fats { get; set; }
    public string? ColorTag { get; set; }
    public string? StorageId { get; set; }
    public string? Type { get; set; }
    // public DateTime? ExpirationDate { get; set; }
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}", ApplyFormatInEditMode = true)]
    public DateTime? ExpirationDate { get; set; }
}