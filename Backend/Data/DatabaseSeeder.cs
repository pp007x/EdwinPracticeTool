using LoginApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using UserContext = LoginApi.Data.UserContext;

public class DatabaseSeeder
{
    private readonly UserContext dbContext;

    public DatabaseSeeder(UserContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public void SeedData()
    {
        SeedCompanies();
        SeedOnderwerpen();
        SeedQuestions();
        SeedUsers();
        SeedTotalScores();
    }

    private void SeedCompanies()
    {
        var companies = new List<Company>
        {
            new Company
            {
                Id = 1,
                Name = "Company 1",
                Description = "Description 1",
                Code = "Code 1"
            },
            new Company
            {
                Id = 2,
                Name = "Company 2",
                Description = "Description 2",
                Code = "Code 2"
            }
        };

        dbContext.Companies.AddRange(companies);
        dbContext.SaveChanges();
    }

    private void SeedOnderwerpen()
    {
        var onderwerpen = new List<Onderwerp>
        {
            new Onderwerp
            {
                Id = 1,
                Name = "Dominant",
                Description = "Doe dominant enzo"
            },
            new Onderwerp
            {
                Id = 2,
                Name = "Invloedrijk",
                Description = "Doe invloedrijk enzo"
            },
            new Onderwerp
            {
                Id = 3,
                Name = "Stabiel",
                Description = "Doe stabiel enzo"
            },
            new Onderwerp
            {
                Id = 4,
                Name = "Consciëntieus",
                Description = "Doe consciëntieus enzo"
            }
        };

        dbContext.Onderwerpen.AddRange(onderwerpen);
        dbContext.SaveChanges();
    }

    private void SeedQuestions()
    {
        var questions = new List<Question>
        {
            new Question
            {
                Id = 1,
                QuestionText = "Question 1",
                Answers = new List<Answer>
                {
                    new Answer
                    {
                        Id = 1,
                        QuestionId = 1,
                        AnswerText = "Answer 1",
                        ScoreValueD = 1,
                        ScoreValueI = 2,
                        ScoreValueS = 3,
                        ScoreValueC = 4
                    },
                    new Answer
                    {
                        Id = 2,
                        QuestionId = 1,
                        AnswerText = "Answer 2",
                        ScoreValueD = 4,
                        ScoreValueI = 3,
                        ScoreValueS = 2,
                        ScoreValueC = 1
                    }
                }
            },
            new Question
            {
                Id = 2,
                QuestionText = "Question 2",
                Answers = new List<Answer>
                {
                    new Answer
                    {
                        Id = 3,
                        QuestionId = 2,
                        AnswerText = "Answer 3",
                        ScoreValueD = 2,
                        ScoreValueI = 1,
                        ScoreValueS = 4,
                        ScoreValueC = 3
                    },
                    new Answer
                    {
                        Id = 4,
                        QuestionId = 2,
                        AnswerText = "Answer 4",
                        ScoreValueD = 3,
                        ScoreValueI = 4,
                        ScoreValueS = 1,
                        ScoreValueC = 2
                    }
                }
            }
        };

        dbContext.Questions.AddRange(questions);
        dbContext.SaveChanges();
    }

    private void SeedUsers()
    {
        var users = new List<User>
        {
            new User
            {
                Id = 1,
                Username = "user1",
                Password = "password1",
                CompanyId = 1,
                IsAdmin = true,
                Box = "Ds"
            },
            new User
            {
                Id = 2,
                Username = "user2",
                Password = "password2",
                CompanyId = 2,
                IsAdmin = false,
                Box = "Sd"
            }
        };

        dbContext.Users.AddRange(users);
        dbContext.SaveChanges();
    }

    private void SeedTotalScores()
    {
        var totalScores = new List<TotalScore>
        {
            new TotalScore
            {
                Id = 1,
                UserId = 1,
                ScoreValueC = 10,
                ScoreValueS = 20,
                ScoreValueI = 30,
                ScoreValueD = 40
            },
            new TotalScore
            {
                Id = 2,
                UserId = 2,
                ScoreValueC = 5,
                ScoreValueS = 15,
                ScoreValueI = 25,
                ScoreValueD = 35
            }
        };

        dbContext.TotalScores.AddRange(totalScores);
        dbContext.SaveChanges();
    }
}

