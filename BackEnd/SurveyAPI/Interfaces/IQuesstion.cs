using SurveyAPI.SurveryModels;

namespace SurveyAPI.Interfaces
{
    public interface IQuesstion
    {
        IEnumerable<Questiontype> GetQuestiontypes();
        IEnumerable<Question> GetQuestions();
    }
}
