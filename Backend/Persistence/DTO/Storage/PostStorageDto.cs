using System.ComponentModel.DataAnnotations;

namespace Persistence.DTO.Storage
{
    public class PostStorageDto
    {
        [Required] public string Name { get; set; }
    }
}