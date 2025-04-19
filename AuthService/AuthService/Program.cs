using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using AuthService.Services.Auth;
using AuthService.Services.File;
using AuthService.Services.Profile;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Options;
using Minio;
using SharedObjects.AppDbContext;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Token"]!)),
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.Configure<MinioSettings>(options =>
{
    options.Endpoint = builder.Configuration["MINIO_ENDPOINT"] ?? "minio:9000";
    options.AccessKey = builder.Configuration["MINIO_ACCESS_KEY_ID"] ?? "admin";
    options.SecretKey = builder.Configuration["MINIO_SECRET_ACCESS_KEY"] ?? "admin123";
    options.Bucket = builder.Configuration["MINIO_BUCKET"] ?? "uploads";
    options.UsePathStyle = bool.Parse(builder.Configuration["MINIO_USE_PATH_STYLE_ENDPOINT"] ?? "true");
});

builder.Services.AddSingleton<IMinioClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MinioSettings>>().Value;
    return new MinioClient()
        .WithEndpoint(settings.Endpoint)
        .WithCredentials(settings.AccessKey, settings.SecretKey)
        .WithRegion("us-east-1")
        .WithSSL(false)
        .Build();
});

builder.Services.AddScoped<IAuthService, AuthService.Services.Auth.AuthService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IFileService, MinioFileService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || Environment.GetEnvironmentVariable("ENABLE_SCALAR") == "true")
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();