using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Common;
using SurveyAPI.Interfaces;
using SurveyAPI.Objects;
using SurveyAPI.SurveyModels;

namespace SurveyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestion m_questions;
        public QuestionController(IQuestion a_questions)
        {
            m_questions = a_questions;
        }

        /// <summary>
        /// Endpoint to return question types
        /// </summary>
        /// <param name="a_start"></param>
        /// <param name="a_end"></param>
        [Authorize]
        [HttpGet, Route("types")]
        public IEnumerable<Questiontype> GetQuestionTypes()
        {
            return m_questions.GetQuestiontypes();
        }
        /// <summary>
        /// Endpoint to return a list question
        /// </summary>
        /// <param name="a_key"></param>
        [Authorize]
        [HttpGet, Route("list/{a_key}")]
        public IEnumerable<QuestionObject> GetQuestions(string a_key)
        {
            return m_questions.GetQuestions(a_key);
        }
        /// <summary>
        /// Endpoint to added a new question
        /// </summary>
        /// <param name="a_question"></param>
        [Authorize]
        [HttpPost, Route("new")]
        public async Task<IActionResult> AddQuestion(QuestionObject a_question)
        {
            if (await m_questions.CreateQuestion(a_question))
            {
                return Ok("Question added successfully");
            }
            return BadRequest("An error occurred while creating question");
        }
    }
}
