using System.ComponentModel.DataAnnotations;
using Domain.Models;

namespace Persistence.DTO.Storage
{
    public class GetStorageDto
    {
        public string Id { get; set; }
        public string Name { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}", ApplyFormatInEditMode = true)]
        public DateTime Created { get; set; }

        // public string ApplicationUserId { get; set; }
        // public ApplicationUser ApplicationUser { get; set; }

        public ICollection<Domain.Models.Ingredient> Ingredients { get; set; }
    }
}