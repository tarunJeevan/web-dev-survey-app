using System;
using System.Collections.Generic;

namespace SurveyAPI.SurveryModels;

public partial class Question
{
    public int Id { get; set; }

    public int Type { get; set; }

    public string Text { get; set; } = null!;

    public DateOnly DateCreated { get; set; }

    public DateOnly DateModified { get; set; }

    public virtual Questiontype TypeNavigation { get; set; } = null!;
}
