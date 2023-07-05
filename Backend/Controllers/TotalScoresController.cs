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
using System.Collections.Generic;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class TotalScoresController : ControllerBase
{
    private readonly UserContext _context;
    private readonly ILogger<TotalScoresController> _logger;
    private readonly IConfiguration _configuration;

    public TotalScoresController(UserContext context, ILogger<TotalScoresController> logger, IConfiguration configuration)
    {
        _context = context;
        _logger = logger;
        _configuration = configuration;
    }
    [Authorize]
[HttpPost]
public async Task<IActionResult> PostTotalScore(TotalScore totalScore)
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

    totalScore.UserId = loggedInUserId;

    _context.TotalScores.Add(totalScore);

    // New code starts here
    var scoreValues = new Dictionary<string, int>
    {
        {"C", totalScore.ScoreValueC},
        {"S", totalScore.ScoreValueS},
        {"I", totalScore.ScoreValueI},
        {"D", totalScore.ScoreValueD},
    };

    var sortedScoreValues = scoreValues.OrderByDescending(x => x.Value).ToList();

    var boxValue = sortedScoreValues[0].Key + sortedScoreValues[1].Key;
    
    var user = await _context.Users.FindAsync(loggedInUserId);
    if (user == null)
    {
        return BadRequest("User not found.");
    }

    user.Box = boxValue;

    _context.Users.Update(user);
    // New code ends here

    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetTotalScoreByUser), new { id = totalScore.Id }, totalScore);
}

[Authorize]
[HttpGet("user/me")]
public async Task<ActionResult<TotalScore>> GetTotalScoresByLoggedInUser()
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

    var totalScore = await _context.TotalScores.FirstOrDefaultAsync(score => score.UserId == loggedInUserId);

    if (totalScore == null)
    {
        return NotFound();
    }

    return totalScore;
}



[HttpGet("user/{id}")]
public async Task<ActionResult<TotalScore>> GetTotalScoreByUser(int id)
{
    // Use the user ID to find the TotalScore
    var totalScore = await _context.TotalScores.FirstOrDefaultAsync(score => score.UserId == id);

    if (totalScore == null)
    {
        return NotFound();
    }

    return totalScore;
}


    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<TotalScore>>> GetAllTotalScores()
    {
        return await _context.TotalScores.ToListAsync();
    }

}
