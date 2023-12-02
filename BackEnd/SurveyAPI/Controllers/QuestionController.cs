using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyAPI.Interfaces;
using SurveyAPI.SurveryModels;

namespace SurveyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuesstion m_questions;
        public QuestionController(IQuesstion a_questions)
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
    }
}
