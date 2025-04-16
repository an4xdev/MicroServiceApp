using SharedObjects.DTOs;
using SharedObjects.Models;

namespace AuthService.Services;

// TODO: change password functionality
// TODO: My profile functionality in an other service?
public interface IAuthService
{
    Task<User?> RegisterAsync(UserDto request);
    Task<TokenResponseDto?> LoginAsync(UserDto request);
    Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);
}