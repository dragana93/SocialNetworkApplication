using SocialNetworkApp.Entities;

namespace SocialNetworkApp.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
