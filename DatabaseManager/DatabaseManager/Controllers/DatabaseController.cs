﻿using DatabaseManager.Seeders;
using Microsoft.AspNetCore.Mvc;
using SharedObjects.AppDbContext;
using SharedObjects.Responses;

namespace DatabaseManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public Task<ActionResult<ApiResponse<bool>>> ResetDatabase()
    {
        try
        {
            DatabaseSeeder.SeedFromSqlFile(context, Constants.Constants.FilePath);
            var result = Result<bool>.Success(true, "Successfully reset database");
            return Task.FromResult(result.ToActionResult());
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            var result = Result<bool>.InternalError(e.Message);
            return Task.FromResult(result.ToActionResult());
        }
    }
}