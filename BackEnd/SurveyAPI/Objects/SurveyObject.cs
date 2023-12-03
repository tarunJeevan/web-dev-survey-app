namespace SurveyAPI.Objects
{
    public class SurveyObject
    {
        public int Id { get; set; }
        public string Description { get; set; }
      public List<QuestionObject> Questions { get; set; }
    }
}
