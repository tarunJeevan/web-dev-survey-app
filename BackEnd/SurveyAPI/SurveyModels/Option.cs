using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveyModels;

public partial class Option
{
    public int Id { get; set; }

    public int QuestionId { get; set; }

    public string Description { get; set; } = null!;
}
