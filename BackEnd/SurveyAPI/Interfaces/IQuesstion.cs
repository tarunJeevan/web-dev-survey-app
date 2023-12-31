﻿using SurveyAPI.Objects;
using SurveyAPI.SurveyModels;

namespace SurveyAPI.Interfaces
{
    public interface IQuestion
    {
        IEnumerable<Questiontype> GetQuestiontypes();
        IEnumerable<QuestionObject> GetQuestions(string a_key);
        Task<bool> CreateQuestion(QuestionObject a_question);
    }
}
