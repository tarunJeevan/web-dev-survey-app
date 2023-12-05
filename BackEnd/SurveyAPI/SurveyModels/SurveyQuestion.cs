using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveyModels;

public partial class SurveyQuestion
{
    public int? SurveyId { get; set; }

    public int? QuestionId { get; set; }

    public int MapId { get; set; }

    public virtual Question? Question { get; set; }

    public virtual Survey? Survey { get; set; }
}
