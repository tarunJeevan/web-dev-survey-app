using SurveyAPI.Interfaces;
using SurveyAPI.SurveryModels;

namespace SurveyAPI.Services
{
    public class QuestionService : IQuesstion
    {
        private readonly WebsurveyPfwContext m_context;
        public QuestionService(WebsurveyPfwContext a_context)
        {
            m_context = a_context;
        }
        public IEnumerable<Question> GetQuestions()
        {
            return m_context.Questions;
        }

        public IEnumerable<Questiontype> GetQuestiontypes()
        {
            return m_context.Questiontypes;
        }
    }
}
