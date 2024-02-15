using Microsoft.AspNetCore.Identity;

namespace SocialNetworkApp.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}