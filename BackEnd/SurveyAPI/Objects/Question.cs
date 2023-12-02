using SurveyAPI.SurveryModels;
using System;
using System.Collections.Generic;

namespace SurveyAPI.Objects;

public partial class QuestionObject
{
    public int Id { get; set; }

    public int Type { get; set; }

    public string Text { get; set; } = null!;

    public DateOnly DateCreated { get; set; }

    public DateOnly DateModified { get; set; }

    public string CreatedBy { get; set; }

    public ICollection<Option> Options { get; set; } = new List<Option>();
}
