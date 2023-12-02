using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveryModels;

public partial class Questiontype
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;
}
