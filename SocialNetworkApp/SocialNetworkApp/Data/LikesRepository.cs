﻿using Microsoft.EntityFrameworkCore;
using SocialNetworkApp.DTOs;
using SocialNetworkApp.Entities;
using SocialNetworkApp.Extensions;
using SocialNetworkApp.Helpers;
using SocialNetworkApp.Interfaces;

namespace SocialNetworkApp.Data
{
    public class LikesRepository : ILikesRepository
    {

        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<PagedList<LikeDTO>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (likesParams.Predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == likesParams.UserId);
                users = likes.Select(like => like.TargetUser);
            }
            
            if (likesParams.Predicate == "likedBy")
            {
                likes = likes.Where(like => like.TargetUserId == likesParams.UserId);
                users = likes.Select(like => like.SourceUser);
             }

            var likedUsers = users.Select(user => new LikeDTO
              {
                    UserName = user.UserName,
                    KnownAs = user.KnownAs,
                    Age = user.DateOfBirth.CalculateAge(),
                    PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                    City = user.City,
                    Id = user.Id
              });

             return await PagedList<LikeDTO>.CreateAsync(likedUsers, likesParams.PageNumber, likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}
