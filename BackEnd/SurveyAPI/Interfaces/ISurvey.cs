using SurveyAPI.Objects;
using SurveyAPI.SurveyModels;

namespace SurveyAPI.Interfaces
{
    public interface ISurvey
    {
        Task<bool> CreateSurvey(Survey a_survey);

        Task<IEnumerable<Survey>> GetResearcherSurveys();
        Survey GetSurveyObject(string a_researcher,int a_surveId);
        Task<bool> SubmitSurvey(SurveyResponse a_response);
    }
}
