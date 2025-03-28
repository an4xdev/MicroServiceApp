using Microsoft.EntityFrameworkCore;
using SharedObjects.Models;

namespace SharedObjects.AppDbContext;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}