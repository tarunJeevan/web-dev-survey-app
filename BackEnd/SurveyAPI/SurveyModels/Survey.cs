using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveyModels;

public partial class Survey
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? LogoPosition { get; set; }

    public string? Pages { get; set; }

    public DateTime? DateCreated { get; set; }
    public string? Logo { get;set; }
    public string? Researcher { get; set; }
}
