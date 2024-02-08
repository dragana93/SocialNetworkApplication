﻿using System.ComponentModel.DataAnnotations;

namespace SocialNetworkApp.DTOs
{
    public class RegisterDTO
    {
        [Required] public string Username { get; set; }

        // [Required] public string KnownAs { get; set; }

        //[Required] public string Gender { get; set; }

        // [Required] public DateTime DateOfBirth { get; set; }

        // [Required] public string City { get; set; }

        //  [Required] public string Country { get; set; }


        //
        // [StringLength(8, MinimumLength = 4)]
        [Required] public string Password { get; set; }
    }
}
