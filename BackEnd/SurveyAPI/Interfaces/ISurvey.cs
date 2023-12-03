using SurveyAPI.Objects;

namespace SurveyAPI.Interfaces
{
    public interface ISurvey
    {
        Task<bool> CreateSurvey(SurveyObject a_survey);
        SurveyObject GetSurveyObject();
    }
}
