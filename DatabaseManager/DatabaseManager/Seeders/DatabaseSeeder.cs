﻿using Microsoft.EntityFrameworkCore;
using SharedObjects.AppDbContext;

namespace DatabaseManager.Seeders;

public static class DatabaseSeeder
{
    public static void SeedFromSqlFile(AppDbContext context, string filePath)
    {
        if (!File.Exists(filePath))
        {
            Console.WriteLine("SQL seed file not found, skipping...");
            return;
        }

        var transaction = context.Database.BeginTransaction();

        try
        {
            Console.WriteLine("Seeding data from SQL file...");

            var sql = File.ReadAllText(filePath);

            context.Database.ExecuteSqlRaw(sql);

            Console.WriteLine("Seeding completed successfully.");

            transaction.Commit();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error executing seed SQL: {ex.Message}");
            transaction.Rollback();
            throw;
        }
        finally
        {
            transaction.Dispose();
        }
    }
}