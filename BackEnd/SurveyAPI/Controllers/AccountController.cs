using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using SurveyAPI.Interfaces;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SurveyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService m_tokenService;

        public AccountController(ITokenService a_tokenService)
        {
            m_tokenService = a_tokenService;
        }
        /// <summary>
        /// Endpoint to get the type of the authenticated user account
        /// </summary>
        /// <returns></returns>
        // GET: api/<AccountController>
        [Authorize]
        [HttpGet, Route("type")]
        public async Task<IActionResult> GetAccountType()
        {
            string token = Request.Headers[HeaderNames.Authorization]!;

            if (!string.IsNullOrEmpty(token))
            {
                return Ok(await m_tokenService.GetUserRoleFromToken(token));
            }
            return BadRequest("Error occurred, please try again later");
        }

    }
}
