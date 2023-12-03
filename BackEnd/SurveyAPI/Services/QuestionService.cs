using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using MySqlConnector;
using NuGet.Configuration;
using SurveyAPI.Interfaces;
using SurveyAPI.Objects;
using SurveyAPI.SurveyModels;
using System.Drawing.Drawing2D;
using System.Text.Json;

namespace SurveyAPI.Services
{
    public class QuestionService : IQuestion
    {
        private readonly WebsurveyPfwContext m_context;
        private readonly IHttpContextAccessor a_HttpContextAccessor;
        private readonly ITokenService m_TokenService;
        private readonly HttpContext m_httpContext;
        public QuestionService(WebsurveyPfwContext a_context, IHttpContextAccessor a_httpContextAccessor, ITokenService a_tokenService)
        {
            m_context = a_context;
            a_HttpContextAccessor = a_httpContextAccessor;
            m_TokenService = a_tokenService;
            m_httpContext = a_httpContextAccessor?.HttpContext;
        }

        public async Task<bool> CreateQuestion(QuestionObject a_question)
        {
            string token = m_httpContext.Request.Headers[HeaderNames.Authorization]!;
            string userId = await m_TokenService.GetUserIDFromToken(token);

            if (!String.IsNullOrEmpty(userId))
            {
                string options = JsonSerializer.Serialize(a_question.Options);
                using (var command = m_context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "CALL AddQuestionWithOptions (@p0,@p1,@p2,@p3,@p4,@p5)";
                    command.Parameters.Add(new MySqlParameter("@p0", a_question.Type));
                    command.Parameters.Add(new MySqlParameter("@p1", a_question.Name));
                    command.Parameters.Add(new MySqlParameter("@p2", DateOnly.FromDateTime(DateTime.Now)));
                    command.Parameters.Add(new MySqlParameter("@p3", DateOnly.FromDateTime(DateTime.Now)));
                    command.Parameters.Add(new MySqlParameter("@p4", userId));
                    command.Parameters.Add(new MySqlParameter("@p5", options));

                    m_context.Database.OpenConnection();
                    command.ExecuteNonQuery();

                    return true;
                }
            }
            return false;
        }

        public IEnumerable<QuestionObject> GetQuestions(string a_key)
        {
            List<QuestionObject> list = new();
            List<Question> questions = m_context.Questions.Where(x => x.Name.Contains(a_key)).ToList();

            for (int i = 0; i < questions.Count; i++)
            {
                Question question = questions[i];
                List<Option> choices = m_context.Options.Where(options => options.QuestionId == question.Id).ToList();
                list.Add(new QuestionObject
                {
                    Id = question.Id,
                    CreatedBy = question.CreatedBy,
                    DateCreated = question.DateCreated,
                    DateModified = question.DateModified,
                    Options = choices,
                    Name = question.Name,
                    Description = question.Description,
                    IsRequired = question.IsRequired,
                    Type = question.Type
                }
                );
            }

            return list.AsEnumerable();
            //using (var command = m_context.Database.GetDbConnection().CreateCommand())
            //{
            //    command.CommandText = "CALL GetTransactionsByDate(@p0,@p1,@p2)";
            //    command.Parameters.Add(new MySqlParameter("@p0", a_start.ToString("yyyy-MM-dd")));
            //    command.Parameters.Add(new MySqlParameter("@p1", a_end.ToString("yyyy-MM-dd")));
            //    command.Parameters.Add(new MySqlParameter("@p2", string.Join(", ", accessiblebranches.ToArray())));

            //    m_context.Database.OpenConnection();

            //    using (var reader = command.ExecuteReader())
            //    {
            //        while (reader.Read())
            //        {
            //            yield return new SaleItem
            //            {
            //                Transno = reader.GetString(0),
            //                Total = (decimal)reader.GetDouble(1),
            //                Date = reader.GetDateTime(2),
            //                Cashier = reader.GetString(3),
            //                BranchId = reader.GetString(4),
            //                Customer = reader.GetString(5),
            //                Status = reader.GetString(6),
            //            };
            //        }
            //    }
            //}
            //return m_context.Questions.Where(question => question.Text.ToLower().Contains(a_key));
        }

        public IEnumerable<Questiontype> GetQuestiontypes()
        {
            return m_context.Questiontypes;
        }
    }
}
