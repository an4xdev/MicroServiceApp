using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController(IHttpClientFactory httpClientFactory) : ControllerBase
    {
        // [HttpGet("flask")]
        // public async Task<ActionResult<FlaskTest>> Flask()
        // {
        //     try
        //     {
        //         // Tworzenie klienta HTTP
        //         var client = httpClientFactory.CreateClient();
        //
        //         // Wysyłanie żądania POST do serwisu autoryzacji
        //         var response = await client.GetFromJsonAsync<FlaskTest>("http://flask:5000/data");
        //
        //         // Zwrócenie odpowiedzi
        //         return Ok(response);
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine(ex.Message);
        //         // Obsługa błędów (np. brak połączenia, problemy sieciowe)
        //         return StatusCode(500, $"An error occurred: {ex.Message}");
        //     }
        // }
    }
}