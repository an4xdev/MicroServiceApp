using ApiGateway.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController(ISendRequestService requestService) : ControllerBase
{
    [HttpGet("fast_api")]
    public async Task<ActionResult<string>> Flask()
    {
        return await requestService.SendRequestAsync<string>(HttpMethod.Get, "/test", ServiceType.FastApiService);
    }

    [HttpGet("fast_api_error")]
    public async Task<ActionResult<string>> FlaskError()
    {
        return await requestService.SendRequestAsync<string>(HttpMethod.Get, "/error", ServiceType.FastApiService);
    }

    [HttpGet("test_error_method")]
    public async Task<ActionResult<string>> TestMethod()
    {
        return await requestService.SendRequestAsync<string>(HttpMethod.Get, "https://foo:8080/bar/baz", (ServiceType)8080);
    }
}