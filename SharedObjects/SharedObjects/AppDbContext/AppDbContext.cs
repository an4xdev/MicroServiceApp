using Microsoft.EntityFrameworkCore;
using SharedObjects.Models;

namespace SharedObjects.AppDbContext;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Sprint> Sprints { get; set; }
    public DbSet<Models.Task> Tasks { get; set; }
    public DbSet<TaskHistory> TaskHistories { get; set; }
    public DbSet<Models.TaskStatus> TaskStatuses { get; set; }
    public DbSet<TaskType> TaskTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<User>()
            .HasIndex(u=>u.Username)
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }
}