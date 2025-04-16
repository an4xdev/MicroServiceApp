using ApiGateway.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SharedObjects.DTOs;
using SharedObjects.Models;

namespace ApiGateway.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(ISendRequestService sendRequestService) : ControllerBase
{
    // TODO: check paths for request
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Authorize(Roles = "admin")]
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto request)
    {
        return await sendRequestService.SendRequestAsync<User>(HttpMethod.Post, "auth/register", ServiceType.AuthService, request);
        // try
        // {
        //     var client = httpClientFactory.CreateClient();
        //
        //     var response = await client.PostAsJsonAsync("http://auth/auth/register", request);
        //
        //     if (!response.IsSuccessStatusCode)
        //     {
        //         var errorContent = await response.Content.ReadAsStringAsync();
        //         return StatusCode((int)response.StatusCode, errorContent);
        //     }
        //
        //     var user = await response.Content.ReadFromJsonAsync<User>();
        //
        //     return user is null
        //         ? StatusCode(500, "Failed to deserialize user object from AuthService.") :
        //         Ok(user);
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine(ex.Message);
        //     return StatusCode(500, $"An error occurred: {ex.Message}");
        // }
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponseDto>> Login(UserDto request)
    {

        return await sendRequestService.SendRequestAsync<TokenResponseDto>(HttpMethod.Post, "auth/login", ServiceType.AuthService, request);
        // try
        // {
        //     var client = httpClientFactory.CreateClient();
        //
        //     var response = await client.PostAsJsonAsync("http://auth/auth/login", request);
        //
        //     if (!response.IsSuccessStatusCode)
        //     {
        //         var errorContent = await response.Content.ReadAsStringAsync();
        //         return StatusCode((int)response.StatusCode, errorContent);
        //     }
        //
        //     var token = await response.Content.ReadFromJsonAsync<TokenResponseDto>();
        //
        //     return token is null
        //         ? StatusCode(500, "Failed to deserialize user object from AuthService.") :
        //         Ok(token);
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine(ex.Message);
        //     return StatusCode(500, $"An error occurred: {ex.Message}");
        // }
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto request)
    {
        return await sendRequestService.SendRequestAsync<TokenResponseDto>(HttpMethod.Post, "auth/refresh-token", ServiceType.AuthService, request);
        // try
        // {
        //     var client = httpClientFactory.CreateClient();
        //
        //     var response = await client.PostAsJsonAsync("htstp://auth/auth/refresh-token", request);
        //
        //     if (!response.IsSuccessStatusCode)
        //     {
        //         var errorContent = await response.Content.ReadAsStringAsync();
        //         return StatusCode((int)response.StatusCode, errorContent);
        //     }
        //
        //     var token = await response.Content.ReadFromJsonAsync<TokenResponseDto>();
        //
        //     return token is null
        //         ? StatusCode(500, "Failed to deserialize user object from AuthService.") :
        //         Ok(token);
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine(ex.Message);
        //     return StatusCode(500, $"An error occurred: {ex.Message}");
        // }
    }
}