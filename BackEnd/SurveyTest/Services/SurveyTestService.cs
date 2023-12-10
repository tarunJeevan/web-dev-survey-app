using SurveyAPI.Interfaces;
using SurveyAPI.SurveyModels;

namespace SurveyTest.Services
{
    /// <summary>
    /// In this thes we are managing the list of surveys from a list of created in memory
    /// not the actually database collection
    /// </summary>
    public class SurveyTestService : ISurvey
    {
        private readonly List<Survey> m_surveys;

        public SurveyTestService()
        {
            m_surveys = new List<Survey>();
            for (int i = 0; i < 100; i++) 
            {
                m_surveys.Add(new Survey { Id = i, Title = $"Survey {i}", Researcher = $"Researcher{i}", Pages = "", Description = $"Test{i}" });
            }
        }

        public Task<bool> CreateSurvey(Survey a_survey)
        {
            m_surveys.Add(a_survey);
            return Task.FromResult(true);
        }

        public Task<IEnumerable<Survey>> GetResearcherSurveys()
        {
            return Task.FromResult<IEnumerable<Survey>>(m_surveys);
        }

        public Survey GetSurveyObject(string a_researcher, int a_surveyId)
        {
            return m_surveys.Find(s => s.Researcher == a_researcher && s.Id == a_surveyId);
        }

        public Task<bool> SubmitSurvey(SurveyResponse a_response)
        {
            return Task.FromResult(true);
        }
    }
}
