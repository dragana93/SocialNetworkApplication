using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SocialNetworkApp.Entities;

namespace SocialNetworkApp.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<AppUser> Users { get; set; }

    }
}


