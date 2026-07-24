using Microsoft.EntityFrameworkCore;
using DatingApp.API.Entities;

namespace DatingApp.API.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUser> users { get; set; }
    }
}
