using SocialNetworkApp.Entities;

namespace SocialNetworkApp.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
