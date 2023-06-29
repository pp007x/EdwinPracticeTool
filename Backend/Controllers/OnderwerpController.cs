using System.Linq;
using System.Collections.Generic;
using LoginApi.Models;
using Microsoft.AspNetCore.Mvc;
using LoginApi.Data;

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

        [HttpGet("user/{userId}")]
        public ActionResult<Onderwerp> GetOnderwerpForUser(int userId)
        {
            // Find the TotalScore for the user
            var totalScore = _context.TotalScores.FirstOrDefault(ts => ts.UserId == userId);
            if (totalScore == null)
            {
                return NotFound();
            }

            // Get the id of the highest score
            int highestScoreId = totalScore.GetHighestScoreId();

            // Find the Onderwerp with the id
            var onderwerp = _context.Onderwerpen.FirstOrDefault(o => o.Id == highestScoreId);
            if (onderwerp == null)
            {
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
    }
}
