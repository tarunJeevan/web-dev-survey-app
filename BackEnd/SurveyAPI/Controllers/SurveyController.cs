using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SurveyAPI.Interfaces;
using SurveyAPI.Objects;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SurveyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly ISurvey m_survey;
        public SurveyController(ISurvey a_survey)
        {
            m_survey = a_survey;
        }
        /// <summary>
        /// Endpoint to added a new survey
        /// </summary>
        /// <param name="a_survey"></param>
        [Authorize]
        [HttpPost, Route("new")]
        public async Task<IActionResult> CreateSurvey(SurveyObject a_survey)
        {
            if (await m_survey.CreateSurvey(a_survey))
            {
                return Ok("Survey added successfully");
            }
            return BadRequest("An error occurred while creating Survey");
        }
    }
}
