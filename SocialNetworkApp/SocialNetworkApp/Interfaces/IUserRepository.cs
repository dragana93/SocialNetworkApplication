using CloudinaryDotNet.Actions;
using SocialNetworkApp.DTOs;
using SocialNetworkApp.Entities;
using SocialNetworkApp.Helpers;

namespace SocialNetworkApp.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams);

        Task<MemberDTO> GetMemberAsync(string username);

        Task<string> GetUserGender(string username);

    }
}
