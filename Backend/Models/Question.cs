namespace LoginApi.Models
{
    public class Question
{
    public int Id { get; set; }
    public string QuestionText { get; set; }
    public List<Answer> Answers { get; set; }
}


public class Answer
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string AnswerText { get; set; }
    public int ScoreValueD { get; set; }
    public int ScoreValueI { get; set; }
    public int ScoreValueS { get; set; }
    public int ScoreValueC { get; set; }
    public Question Question { get; set; }
}


public class QuestionDTO
{
    public int Id { get; set; }
    public string QuestionText { get; set; }
    public List<AnswerDTO> Answers { get; set; }
}

public class AnswerDTO
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string AnswerText { get; set; }
    public int ScoreValueD { get; set; }
    public int ScoreValueI { get; set; }
    public int ScoreValueS { get; set; }
    public int ScoreValueC { get; set; }
}
}