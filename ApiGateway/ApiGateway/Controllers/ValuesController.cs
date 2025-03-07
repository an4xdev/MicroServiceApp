using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = "Bearer")]
public class ValuesController : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "admin")]
    [Route("get-admin")]
    public IActionResult GetAdmin()
    {
        return Ok("You are admin.");
    }

    [HttpGet]
    [Authorize(Roles = "user")]
    [Route("get-user")]
    public IActionResult GetUser()
    {
        return Ok("You are user.");
    }
}
