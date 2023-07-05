using System.Linq;
using System.Collections.Generic;
using LoginApi.Models;
using Microsoft.AspNetCore.Mvc;
using LoginApi.Data;
using Microsoft.EntityFrameworkCore;

namespace LoginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnderwerpController : ControllerBase
    {
        private readonly UserContext _context;

        public OnderwerpController(UserContext context)
        {
            _context = context;
        }
    [HttpGet]
    public ActionResult<IEnumerable<Onderwerp>> GetOnderwerpen()
    {
        return _context.Onderwerpen.ToList();
    }


private readonly Dictionary<string, string> _boxToOnderwerpMapping = new Dictionary<string, string>
{
    {"C", "Analyticus"},
    {"Cd", "Strateeg"},
    {"Cs", "Perfectionist"},
    {"Ci", "raadgever"},
    {"Dc", "Pionier"},
    {"D", "Beslisser"},
    {"Ds", "Doorzetter"},
    {"Di", "Avonturier"},
    {"Sc", "Specialist"},
    {"Sd", "Doener"},
    {"S", "Dienstverlener"},
    {"Si", "Helper"},
    {"Ic", "Diplomaat"},
    {"Id", "Inspirator"},
    {"Is", "Bemiddelaar"},
    {"I", "Entertainer"}
};


[HttpGet("user/{userId}")]
public ActionResult<Onderwerp> GetOnderwerpForUser(int userId)
{
    // Fetch the user
    var user = _context.Users.FirstOrDefault(u => u.Id == userId);
    if (user == null)
    {
        Console.WriteLine("User not found");
        return NotFound();
    }

    // Get the user's box
    string box = user.Box;

    // Map the box to the Onderwerp name
    if (!_boxToOnderwerpMapping.TryGetValue(box, out string onderwerpName))
    {
        Console.WriteLine("Box not found");
        return NotFound();
    }

    // Find the Onderwerp with the name
    var onderwerp = _context.Onderwerpen.FirstOrDefault(o => o.Name == onderwerpName);
    if (onderwerp == null)
    {
        Console.WriteLine("Onderwerp not found");
        return NotFound();
    }

    return onderwerp;
}


        [HttpGet("box/{userId}")]
        public ActionResult<string> GetUserBox(int userId)
        {
            // Fetch the user's scores
            var userScores = _context.TotalScores.FirstOrDefault(ts => ts.UserId == userId);
            if (userScores == null)
            {
                return NotFound();
            }

            // Determine the box based on the scores
            string box = DetermineUserBox(userScores);

            return box;
        }

        private string DetermineUserBox(TotalScore scores)
        {
            // Determine the two highest scores and return the corresponding box
            // This is a simplified example, you may need to adjust this function to match your exact logic
            var scoreList = new List<Tuple<string, int>>
            {
                Tuple.Create("D", scores.ScoreValueD),
                Tuple.Create("I", scores.ScoreValueI),
                Tuple.Create("S", scores.ScoreValueS),
                Tuple.Create("C", scores.ScoreValueC),
            };

            var sortedScores = scoreList.OrderByDescending(score => score.Item2).ToList();

            return sortedScores[0].Item1 + sortedScores[1].Item1;
        }

        [HttpGet("company/{companyId}")]
        public ActionResult<List<UserBox>> GetCompanyUsers(int companyId)
        {
            var companyUsers = _context.Users.Where(u => u.CompanyId == companyId);
            if (companyUsers == null || !companyUsers.Any())
            {
                return NotFound();
            }

            List<UserBox> userBoxes = new List<UserBox>();
            foreach (var user in companyUsers)
            {
                var box = GetUserBox(user.Id).Value;
                userBoxes.Add(new UserBox { UserId = user.Id, UserName = user.Username, Box = box });
            }

            return userBoxes;
        }
    // OnderwerpController.cs
[HttpGet("{id}")]
public ActionResult<Onderwerp> GetOnderwerp(int id)
{
    var onderwerp = _context.Onderwerpen.Find(id);
    if (onderwerp == null)
    {
        return NotFound();
    }
    return onderwerp;
}

[HttpPut("{id}")]
public ActionResult<Onderwerp> UpdateOnderwerp(int id, Onderwerp onderwerp)
{
    if (id != onderwerp.Id)
    {
        return BadRequest();
    }

    _context.Entry(onderwerp).State = EntityState.Modified;
    try
    {
        _context.SaveChanges();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!_context.Onderwerpen.Any(o => o.Id == id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }
    return NoContent();
}

    }
}
