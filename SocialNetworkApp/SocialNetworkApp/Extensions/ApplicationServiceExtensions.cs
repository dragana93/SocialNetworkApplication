using Microsoft.EntityFrameworkCore;
using SocialNetworkApp.Data;
using SocialNetworkApp.Interfaces;
using SocialNetworkApp.Services;

namespace SocialNetworkApp.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            

          //  services.AddScoped<LogUserActivity>();
           // services.AddScoped<IUserRepository, UserRepository>();
          //  services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("AppDatabase"));
            });

            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
