using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SocialNetworkApp.Interfaces;

namespace SocialNetworkApp.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        IUserRepository IUnitOfWork.UserRepository => new UserRepository(_context, _mapper);

        IMessageRepository IUnitOfWork.MessageRepository => new MessageRepository(_context, _mapper);

        ILikesRepository IUnitOfWork.LikesRepository => new LikesRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        bool IUnitOfWork.HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
