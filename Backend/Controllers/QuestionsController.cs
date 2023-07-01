using LoginApi.Data;
using LoginApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

[Route("api/[controller]")]
[ApiController]
public class QuestionsController : ControllerBase
{
    private readonly UserContext _context;
    private readonly ILogger<QuestionsController> _logger;
    private readonly IConfiguration _configuration;

    public QuestionsController(UserContext context, ILogger<QuestionsController> logger, IConfiguration configuration)
    {
        _context = context;
        _logger = logger;
        _configuration = configuration;
    }
    [HttpGet]
    public async Task<ActionResult<List<QuestionDTO>>> GetQuestions()
    {
        var questions = await _context.Questions.Include(q => q.Answers).ToListAsync();

        var questionDTOs = questions.Select(q => new QuestionDTO 
        {
            Id = q.Id,
            QuestionText = q.QuestionText,
            Answers = q.Answers.Select(a => new AnswerDTO
            {
                Id = a.Id,
                QuestionId = a.QuestionId,
                AnswerText = a.AnswerText,
                ScoreValueC = a.ScoreValueC,
                ScoreValueS = a.ScoreValueS,
                ScoreValueI = a.ScoreValueI,
                ScoreValueD = a.ScoreValueD
            }).ToList()
        }).ToList();

        return questionDTOs;
    }
}
