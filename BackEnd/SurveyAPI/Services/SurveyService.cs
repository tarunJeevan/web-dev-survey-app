using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using MySqlConnector;
using SurveyAPI.Interfaces;
using SurveyAPI.Objects;
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

        public async Task<bool> CreateSurvey(SurveyObject a_survey)
        {
            string token = m_httpContext.Request.Headers[HeaderNames.Authorization]!;
            string userId = await m_TokenService.GetUserIDFromToken(token);

            if (!String.IsNullOrEmpty(userId))
            {
                string questions = JsonSerializer.Serialize(a_survey.Questions);
                using (var command = m_context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "CALL CreateSurvey (@p0, @p1, @p2, @p3,@p4)";
                    //command.Parameters.Add(new MySqlParameter("@p0", a_question.Type));
                    //command.Parameters.Add(new MySqlParameter("@p1", a_question.Name));
                    command.Parameters.Add(new MySqlParameter("@p0", a_survey.Description));
                    command.Parameters.Add(new MySqlParameter("@p1", userId));
                    command.Parameters.Add(new MySqlParameter("@p2", DateOnly.FromDateTime(DateTime.Now)));
                    command.Parameters.Add(new MySqlParameter("@p3", DateOnly.FromDateTime(DateTime.Now)));
                    command.Parameters.Add(new MySqlParameter("@p4", questions));

                    m_context.Database.OpenConnection();
                    command.ExecuteNonQuery();

                    return true;
                }
            }
            return false;
        }

        public SurveyObject GetSurveyObject()
        {
            throw new NotImplementedException();
        }
    }
}
