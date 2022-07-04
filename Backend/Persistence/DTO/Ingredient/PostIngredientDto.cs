using System.ComponentModel.DataAnnotations;

namespace Persistence.DTO.Ingredient
{
    public class PostIngredientDto
    {
        [Required] public string Id { get; set; }
        [Required] public string Name { get; set; }
        public string? Picture { get; set; }
        public double? Calories { get; set; }
        public double? Carbs { get; set; }
        public double? Proteins { get; set; }
        public int? Weight { get; set; }
        public int? AmountUnits { get; set; }
        public double? Fats { get; set; }
        public string? Type { get; set; }
        public string? ColorTag { get; set; }

        public string? StorageId { get; set; }

        [DataType(DataType.Date)]
        // [DataType(DataType.DateTime)]
        // [DisplayFormat(DataFormatString = "{0:yyyy/MM/ddTHH:mm:ss.fffZ}", ApplyFormatInEditMode = true)]
        // [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}", ApplyFormatInEditMode = true)]
        [DisplayFormat(DataFormatString = "{yyyy-MM-ddTHH:mm:ss.fffZ}", ApplyFormatInEditMode = true)]
        public DateTime? ExpirationDate { get; set; }
    }
}