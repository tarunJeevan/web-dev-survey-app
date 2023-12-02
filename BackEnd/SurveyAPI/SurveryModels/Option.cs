using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveryModels;

public partial class Option
{
    public int Id { get; set; }

    public int QuestionId { get; set; }

    public string Description { get; set; } = null!;

    public virtual Question Question { get; set; } = null!;
}
