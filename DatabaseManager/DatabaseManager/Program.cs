using Microsoft.EntityFrameworkCore;
using SharedObjects.AppDbContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("DatabaseManager"))
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

using var serviceScope = app.Services.CreateScope();
var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();

var pendingMigrations = context.Database.GetPendingMigrations().ToList();

if (pendingMigrations.Count != 0)
{
    Console.WriteLine($"Applying pending migrations.");
    foreach (var migration in pendingMigrations)
    {
        Console.WriteLine($"- {migration}");
    }

    try
    {
        context.Database.Migrate();
        Console.WriteLine("Migrations completed successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred during migration: {ex.Message}");
        if (ex.InnerException != null)
        {
            Console.WriteLine($"Error details: {ex.InnerException.Message}");
        }
    }
}
else
{
    Console.WriteLine("No pending migrations.");
}

app.Run();