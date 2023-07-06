using LoginApi.Data;
using LoginApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LoginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenReactionFormController : ControllerBase
    {
        private readonly UserContext _context;

        public OpenReactionFormController(UserContext context)
        {
            _context = context;
        }


[HttpGet("open")]
[Authorize]
public async Task<ActionResult<List<QuestionOpenDTO>>> GetOpenQuestions()
{
    var nameIdentifierClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    if (nameIdentifierClaim == null)
    {
        return BadRequest("No user is currently logged in.");
    }

    if (!int.TryParse(nameIdentifierClaim.Value, out var loggedInUserId))
    {
        return BadRequest("Invalid user ID.");
    }

    var user = await _context.Users.FindAsync(loggedInUserId);

    if (user == null)
    {
        return NotFound();
    }

    var openQuestions = await _context.QuestionOpen
        .Where(q => q.CompanyId == user.CompanyId)
        .Include(q => q.Answers)
        .ToListAsync();

    var questionOpenDTOs = openQuestions.Select(q => new QuestionOpenDTO
    {
        Id = q.Id,
        QuestionText = q.QuestionText,
        CompanyId = q.CompanyId,
        Answers = q.Answers.Select(a => new AnswerOpenDTO
        {
            Id = a.Id,
            QuestionOpenId = a.QuestionOpenId,
            AnswerText = a.AnswerText
        }).ToList()
    }).ToList();

    return questionOpenDTOs;
}




[HttpGet("user/me/answers")]
[Authorize]
public async Task<ActionResult<IEnumerable<OpenAnswers>>> GetAnswersByLoggedInUser()
{
    var nameIdentifierClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    if (nameIdentifierClaim == null)
    {
        return BadRequest("No user is currently logged in.");
    }

    if (!int.TryParse(nameIdentifierClaim.Value, out var loggedInUserId))
    {
        return BadRequest("Invalid user ID.");
    }

    var userAnswers = await _context.OpenAnswers.Where(answer => answer.UserId == loggedInUserId).ToListAsync();

    if (!userAnswers.Any())
    {
        return NotFound();
    }

    return userAnswers;
}

[HttpPost("openanswers")]
[Authorize]
public async Task<ActionResult> PostOpenAnswers(List<OpenAnswerDTO> openAnswerDTOs)
{
    var nameIdentifierClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    if (nameIdentifierClaim == null)
    {
        return BadRequest("No user is currently logged in.");
    }

    if (!int.TryParse(nameIdentifierClaim.Value, out var loggedInUserId))
    {
        return BadRequest("Invalid user ID.");
    }

    var user = await _context.Users.FindAsync(loggedInUserId);

    if (user == null)
    {
        return NotFound();
    }
    
    // Generate a random session ID
    Random random = new Random();
    int newSession;
    do
    {
        newSession = random.Next(int.MinValue, int.MaxValue);
    } while (_context.OpenAnswers.Any(a => a.Session == newSession));

    var openAnswers = openAnswerDTOs.Select(dto => new OpenAnswers
    {
        QuestionOpenId = dto.QuestionId,
        AnswerText = dto.AnswerText,
        UserId = loggedInUserId,
        Session = newSession  // assign the session to the answer
    }).ToList();

    await _context.OpenAnswers.AddRangeAsync(openAnswers);
    await _context.SaveChangesAsync();

    return Ok();
}

    }}