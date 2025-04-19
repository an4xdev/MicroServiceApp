using SharedObjects.DTOs;
using SharedObjects.Models;

namespace AuthService.Services.Auth;

// TODO: change password functionality
public interface IAuthService
{
    Task<User?> RegisterAsync(UserDto request);
    Task<TokenResponseDto?> LoginAsync(UserDto request);
    Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);
}