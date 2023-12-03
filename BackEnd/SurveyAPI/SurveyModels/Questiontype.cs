using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveyModels;

public partial class Questiontype
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public string? Name { get; set; }
}
