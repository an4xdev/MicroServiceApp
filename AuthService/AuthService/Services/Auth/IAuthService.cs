using Microsoft.AspNetCore.Mvc;
using SharedObjects.DTOs;
using SharedObjects.Models;

namespace AuthService.Services.Auth;

// TODO: change password functionality
public interface IAuthService
{
    Task<User?> RegisterAsync(AdminRegisterDto request);
    Task<TokenResponseDto?> LoginAsync(UserLoginDto request);
    Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);

    Task<IActionResult> ChangePassword(ChangePasswordDto request);
}