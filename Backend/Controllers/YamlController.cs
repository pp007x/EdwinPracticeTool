using LoginApi.Data;
using LoginApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace LoginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YamlUploadController : ControllerBase
    {
        private readonly UserContext _context;

        public YamlUploadController(UserContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostQuestionData([FromBody] List<QuestionDTO> questionDTOs)
        {
            try
            {
                foreach (var questionDTO in questionDTOs)
                {
                    var question = new Question { QuestionText = questionDTO.QuestionText };
                    _context.Questions.Add(question);
                    await _context.SaveChangesAsync();

                    foreach (var answerDTO in questionDTO.Answers)
                    {
                        var answer = new Answer
                        {
                            QuestionId = question.Id,
                            AnswerText = answerDTO.AnswerText,
                            ScoreValueD = answerDTO.ScoreValueD,
                            ScoreValueI = answerDTO.ScoreValueI,
                            ScoreValueS = answerDTO.ScoreValueS,
                            ScoreValueC = answerDTO.ScoreValueC,
                        };
                        _context.Answers.Add(answer);
                    }
                }
                await _context.SaveChangesAsync();
                return Ok("Questions and answers from YAML file successfully saved to database");
            }
            catch (Exception e)
            {
                return BadRequest("An error occurred: " + e.Message);
            }
        }
    }
}
