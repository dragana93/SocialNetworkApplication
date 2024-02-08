using System.ComponentModel.DataAnnotations;

namespace SocialNetworkApp.DTOs
{
    public class LoginDTO
    {
        [Required] public string Username { get; set; }

        [Required] public string Password { get; set; }
    }
}
