using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SurveyAPI.Interfaces;
using SurveyAPI.Objects;
using SurveyAPI.SurveyModels;

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
        /// Endpoint to add a new survey
        /// </summary>
        /// <param name="a_survey"></param>
        [Authorize]
        [HttpPost, Route("new")]
        public async Task<IActionResult> CreateSurvey(Survey a_survey)
        {
            if (await m_survey.CreateSurvey(a_survey))
            {
                return Ok("Survey added successfully");
            }
            return BadRequest("An error occurred while creating Survey");
        }
        /// <summary>
        /// Endpoint to add a submit a  survey
        /// </summary>
        /// <param name="a_survey"></param>
        [Authorize]
        [HttpPost, Route("response")]
        public async Task<IActionResult> SubmitResponseSurvey(SurveyResponse a_survey)
        {
            if (await m_survey.SubmitSurvey(a_survey))
            {
                return Ok("Survey response submtted successfully");
            }
            return BadRequest("An error occurred while submitting Survey");
        }
        /// <summary>
        /// Endpoint to get survey by user
        /// </summary>
        /// <param name="a_survey"></param>
        [Authorize]
        [HttpGet, Route("my-surveys")]
        public async Task<IEnumerable<Survey>> GetSurvey()
        {
            return await m_survey.GetResearcherSurveys();
        }

        /// <summary>
        /// Endpoint to get survey by researcher and id
        /// </summary>
        /// <param name="a_survey"></param>
        [HttpGet, Route("{a_researcher}/{a_surveyId}")]
        public Survey GetSurvey(string a_researcher, int a_surveyId)
        {
            return m_survey.GetSurveyObject(a_researcher, a_surveyId);
        }
    }
}
