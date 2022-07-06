using Persistence.DTO.Storage;

namespace Persistence.DTO.Ingredient
{
    public class GetIngredientDto
    {
        public string Id { get; set; }
        public double? Carbs { get; set; }
        public double? Fats { get; set; }
        public double? Proteins { get; set; }

        public double? Calories { get; set; }

        public int? Weight { get; set; }

        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}", ApplyFormatInEditMode = true)]
        public DateTime Created { get; set; }

        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}", ApplyFormatInEditMode = true)]
        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}", ApplyFormatInEditMode = true)]
        public DateTime? ExpirationDate { get; set; }

        public string? Type { get; set; }

        public string Name { get; set; }

        public int AmountUnits { get; set; }

        public string? Picture { get; set; }

        public string? ColorTag { get; set; }

        public string StorageId { get; set; }
        public StorageForIngredientDto Storage { get; set; }
        public bool Expired => ExpirationDate > DateTime.Now;
    }
}