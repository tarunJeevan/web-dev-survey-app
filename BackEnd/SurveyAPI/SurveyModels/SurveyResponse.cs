using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveyModels;

public partial class SurveyResponse
{
    public int Int { get; set; }

    public int SurveyId { get; set; }

    public string Response { get; set; } = null!;
}
