using LoginApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
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
                Code = "1"
            },
            new Company
            {
                Id = 2,
                Name = "Company 2",
                Description = "Description 2",
                Code = "2"
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
            Name = "Analyticus",
            Description = "Doe Analyticus enzo"
        },
        new Onderwerp
        {
            Id = 2,
            Name = "Strateeg",
            Description = "Doe Strateeg enzo"
        },
        new Onderwerp
        {
            Id = 3,
            Name = "Perfectionist",
            Description = "Doe Perfectionist enzo"
        },
        new Onderwerp
        {
            Id = 4,
            Name = "Raadgever",
            Description = "Doe Raadgever enzo"
        },
        new Onderwerp
        {
            Id = 5,
            Name = "Pionier",
            Description = "Doe Pionier enzo"
        },
        new Onderwerp
        {
            Id = 6,
            Name = "Beslisser",
            Description = "Doe Beslisser enzo"
        },
        new Onderwerp
        {
            Id = 7,
            Name = "Doorzetter",
            Description = "Doe Doorzetter enzo"
        },
        new Onderwerp
        {
            Id = 8,
            Name = "Avonturier",
            Description = "Doe Avonturier enzo"
        },
        new Onderwerp
        {
            Id = 9,
            Name = "Specialist",
            Description = "Doe Specialist enzo"
        },
        new Onderwerp
        {
            Id = 10,
            Name = "Doener",
            Description = "Doe Doener enzo"
        },
        new Onderwerp
        {
            Id = 11,
            Name = "Dienstverlener",
            Description = "Doe Dienstverlener enzo"
        },
        new Onderwerp
        {
            Id = 12,
            Name = "Helper",
            Description = "Doe Helper enzo"
        },
        new Onderwerp
        {
            Id = 13,
            Name = "Diplomaat",
            Description = "Doe Diplomaat enzo"
        },
        new Onderwerp
        {
            Id = 14,
            Name = "Inspirator",
            Description = "Doe Inspirator enzo"
        },
        new Onderwerp
        {
            Id = 15,
            Name = "Bemiddelaar",
            Description = "Doe Bemiddelaar enzo"
        },
        new Onderwerp
        {
            Id = 16,
            Name = "Entertainer",
            Description = "Doe Entertainer enzo"
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
        var random = new Random();

        var boxes = new List<string>
        {
            "C", "Cd", "Cs", "Ci","Dc", "D", "Ds", "Di","Sc", "Sd", "S", "Si", "Ic", "Id", "Is", "I"
        };

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
                CompanyId = 1,
                IsAdmin = false,
                Box = "Sd"
            },
            new User
            {
                Id = 3,
                Username = "John",
                Password = "password3",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 4,
                Username = "Jane",
                Password = "password4",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 5,
                Username = "Michael",
                Password = "password5",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 6,
                Username = "Emily",
                Password = "password6",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 7,
                Username = "David",
                Password = "password7",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 8,
                Username = "Sarah",
                Password = "password8",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 9,
                Username = "Matthew",
                Password = "password9",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 10,
                Username = "Olivia",
                Password = "password10",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 11,
                Username = "Daniel",
                Password = "password11",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 12,
                Username = "Sophia",
                Password = "password12",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 13,
                Username = "William",
                Password = "password13",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 14,
                Username = "Emma",
                Password = "password14",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 15,
                Username = "Liam",
                Password = "password15",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 16,
                Username = "Jacob",
                Password = "password16",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 17,
                Username = "Mia",
                Password = "password17",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 18,
                Username = "Ethan",
                Password = "password18",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 19,
                Username = "Ava",
                Password = "password19",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            },
            new User
            {
                Id = 20,
                Username = "Noah",
                Password = "password20",
                CompanyId = 1,
                IsAdmin = false,
                Box = boxes[random.Next(boxes.Count)]
            }
        };

        dbContext.Users.AddRange(users);
        dbContext.SaveChanges();
    }

private void SeedTotalScores()
{
    var users = dbContext.Users;
    var random = new Random();

    var totalScores = new List<TotalScore>();

    foreach (var user in users)
    {
        totalScores.Add(new TotalScore
        {
            UserId = user.Id,
            ScoreValueC = random.Next(1, 41),
            ScoreValueS = random.Next(1, 41),
            ScoreValueI = random.Next(1, 41),
            ScoreValueD = random.Next(1, 41)
        });
    }

    dbContext.TotalScores.AddRange(totalScores);
    dbContext.SaveChanges();
}

}
