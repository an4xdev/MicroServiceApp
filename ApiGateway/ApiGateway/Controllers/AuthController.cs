using Microsoft.AspNetCore.Mvc;
using SharedObjects.DTOs;
using SharedObjects.Models;

namespace ApiGateway.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController(IHttpClientFactory httpClientFactory) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            try
            {
                // Tworzenie klienta HTTP
                var client = httpClientFactory.CreateClient();

                // Wysyłanie żądania POST do serwisu autoryzacji
                var response = await client.PostAsJsonAsync("http://auth/auth/register", request);

                // Sprawdzenie, czy odpowiedź jest sukcesem
                if (!response.IsSuccessStatusCode)
                {
                    // Jeśli serwis autoryzacji zwraca błąd, odczytaj treść odpowiedzi
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorContent);
                }

                // Deserializacja odpowiedzi z serwisu autoryzacji
                var user = await response.Content.ReadFromJsonAsync<User>();

                if (user is null)
                {
                    return StatusCode(500, "Failed to deserialize user object from AuthService.");
                }

                // Zwrócenie odpowiedzi
                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // Obsługa błędów (np. brak połączenia, problemy sieciowe)
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(UserDto request)
        {
            try
            {
                // Tworzenie klienta HTTP
                var client = httpClientFactory.CreateClient();

                // Wysyłanie żądania POST do serwisu autoryzacji
                var response = await client.PostAsJsonAsync("http://auth/auth/login", request);

                // Sprawdzenie, czy odpowiedź jest sukcesem
                if (!response.IsSuccessStatusCode)
                {
                    // Jeśli serwis autoryzacji zwraca błąd, odczytaj treść odpowiedzi
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorContent);
                }

                // Deserializacja odpowiedzi z serwisu autoryzacji
                var token = await response.Content.ReadFromJsonAsync<TokenResponseDto>();

                if (token is null)
                {
                    return StatusCode(500, "Failed to deserialize user object from AuthService.");
                }

                // Zwrócenie odpowiedzi
                return Ok(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // Obsługa błędów (np. brak połączenia, problemy sieciowe)
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto request)
        {
            try
            {
                // Tworzenie klienta HTTP
                var client = httpClientFactory.CreateClient();

                // Wysyłanie żądania POST do serwisu autoryzacji
                var response = await client.PostAsJsonAsync("http://auth/auth/refresh-token", request);

                // Sprawdzenie, czy odpowiedź jest sukcesem
                if (!response.IsSuccessStatusCode)
                {
                    // Jeśli serwis autoryzacji zwraca błąd, odczytaj treść odpowiedzi
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorContent);
                }

                // Deserializacja odpowiedzi z serwisu autoryzacji
                var token = await response.Content.ReadFromJsonAsync<TokenResponseDto>();

                if (token is null)
                {
                    return StatusCode(500, "Failed to deserialize user object from AuthService.");
                }

                // Zwrócenie odpowiedzi
                return Ok(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // Obsługa błędów (np. brak połączenia, problemy sieciowe)
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}