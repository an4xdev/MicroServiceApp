using SharedObjects.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthService.DbContext;

public class AppDbContext(DbContextOptions<AppDbContext> options) : Microsoft.EntityFrameworkCore.DbContext(options)
{
    public DbSet<User> Users { get; set; }
}