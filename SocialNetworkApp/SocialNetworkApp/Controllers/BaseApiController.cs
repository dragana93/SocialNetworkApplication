using Microsoft.AspNetCore.Mvc;
using SocialNetworkApp.Data;
using SocialNetworkApp.Entities;
using SocialNetworkApp.Helpers;

namespace SocialNetworkApp.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase

    {
    }
}
