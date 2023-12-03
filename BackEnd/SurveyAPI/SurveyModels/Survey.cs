using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveyModels;

public partial class Survey
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public DateTime? Expiration { get; set; }

    public DateTime? DateCreated { get; set; }

    public string? Researcher { get; set; }

}
