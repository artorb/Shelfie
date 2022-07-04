using System.ComponentModel.DataAnnotations;

namespace Persistence.DTO.User;

public class RegisterDTO
{
    [Required] [EmailAddress] public string Email { get; set; }

    // regex for a 1aA and 4 < > 8
    [Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$",
        ErrorMessage = "Must be between 4 and 8 characters, must contain a digit and lower and uppercase characters")]
    public string Password { get; set; }

    [Required] public string Username { get; set; }
}