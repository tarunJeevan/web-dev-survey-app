using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveryModels;

/// <summary>
/// table for researchers
/// </summary>
public partial class Researcher
{
    public string ResearcherId { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;
}
