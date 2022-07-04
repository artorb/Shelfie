using System.ComponentModel.DataAnnotations;

namespace Persistence.DTO.Storage
{
    public class PutStorageDto
    {
        [Required] public string Name { get; set; }
    }
}