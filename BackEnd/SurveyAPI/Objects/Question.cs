using SurveyAPI.SurveyModels;
using System;
using System.Collections.Generic;

namespace SurveyAPI.Objects;

public partial class QuestionObject
{
    public int Id { get; set; }

    public int Type { get; set; }

    public string? Name { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public ulong IsRequired { get; set; }

    public int RateMax { get; set; }

    public int MaxLength { get; set; }

    public DateOnly DateCreated { get; set; }

    public DateOnly DateModified { get; set; }

    public string CreatedBy { get; set; }

    public ICollection<Option> Options { get; set; } = new List<Option>();
}
