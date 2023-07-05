using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using LoginApi.Data;
using LoginApi.Models;


[Route("api/[controller]")]
[ApiController]
public class AddQuestionController : ControllerBase
{
    private readonly UserContext _context;
    private readonly ILogger<AddQuestionController> _logger;
    private readonly IConfiguration _configuration;

    public AddQuestionController(UserContext context, ILogger<AddQuestionController> logger, IConfiguration configuration)
    {
        _context = context;
        _logger = logger;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult<QuestionDTO>> PostQuestion(QuestionDTO questionDto)
    {
        var question = new Question {
            QuestionText = questionDto.QuestionText,
            CompanyId = questionDto.CompanyId,
            Answers = questionDto.Answers.Select(a => new Answer {
                AnswerText = a.AnswerText,
                ScoreValueD = a.ScoreValueD,
                ScoreValueI = a.ScoreValueI,
                ScoreValueS = a.ScoreValueS,
                ScoreValueC = a.ScoreValueC,
            }).ToList()
        };

        _context.Questions.Add(question);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetQuestion", new { id = question.Id }, questionDto);
    }

    [HttpGet("{id}")]
public async Task<ActionResult<QuestionDTO>> GetQuestion(int id)
{
    var question = await _context.Questions.FindAsync(id);

    if (question == null)
    {
        return NotFound();
    }

    return new QuestionDTO
    {
        QuestionText = question.QuestionText,
        CompanyId = question.CompanyId,
        Answers = question.Answers.Select(a => new AnswerDTO
        {
            AnswerText = a.AnswerText,
            ScoreValueD = a.ScoreValueD,
            ScoreValueI = a.ScoreValueI,
            ScoreValueS = a.ScoreValueS,
            ScoreValueC = a.ScoreValueC,
        }).ToList()
    };
}

}
