using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using MySqlConnector;
using SurveyAPI.Interfaces;
using SurveyAPI.SurveyModels;
using System.Text.Json;

namespace SurveyAPI.Services
{
    public class SurveyService : ISurvey
    {
        private readonly WebsurveyPfwContext m_context;
        private readonly IHttpContextAccessor a_HttpContextAccessor;
        private readonly ITokenService m_TokenService;
        private readonly HttpContext m_httpContext;
        public SurveyService(WebsurveyPfwContext a_context, IHttpContextAccessor a_httpContextAccessor, ITokenService a_tokenService)
        {
            m_context = a_context;
            a_HttpContextAccessor = a_httpContextAccessor;
            m_TokenService = a_tokenService;
            m_httpContext = a_httpContextAccessor?.HttpContext;
        }

        public async Task<bool> CreateSurvey(Survey a_survey)
        {
            string token = m_httpContext.Request.Headers[HeaderNames.Authorization]!;
            string userId = await m_TokenService.GetUserIDFromToken(token);

            if (!String.IsNullOrEmpty(userId))
            {
                a_survey.Researcher = userId;
                a_survey.DateCreated = DateTime.Now;
                m_context.Surveys.Add(a_survey);

                try
                {
                    await m_context.SaveChangesAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
            return false;
        }

        public async Task<IEnumerable<Survey>> GetResearcherSurveys()
        {
            string token = m_httpContext.Request.Headers[HeaderNames.Authorization]!;
            string userId = await m_TokenService.GetUserIDFromToken(token);

            if (!String.IsNullOrEmpty(userId))
            {
                return await m_context.Surveys.Where(r => r.Researcher == userId).ToListAsync();
            }
            return new List<Survey>();
        }

        public Survey? GetSurveyObject(string a_researcher, int a_surveId)
        {
            return m_context.Surveys.FirstOrDefault(r => r.Id == a_surveId && r.Researcher == a_researcher);
        }

        public async Task<bool> SubmitSurvey(SurveyResponse a_response)
        {
            m_context.SurveyResponses.Add(a_response);
            if (await m_context.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
    }
}
