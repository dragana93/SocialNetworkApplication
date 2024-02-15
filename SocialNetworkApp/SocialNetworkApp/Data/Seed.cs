using Microsoft.EntityFrameworkCore;
using SocialNetworkApp.Entities;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SocialNetworkApp.Data
{
    public class Seed
    {

        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive  = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            foreach ( var user in users )
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("g@G@1993"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}
