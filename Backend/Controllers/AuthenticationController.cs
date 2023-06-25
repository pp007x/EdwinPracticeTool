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
public class AuthenticationController : ControllerBase
{
    private readonly UserContext _context;
    private readonly ILogger<AuthenticationController> _logger;
    private readonly IConfiguration _configuration;

    public AuthenticationController(UserContext context, ILogger<AuthenticationController> logger, IConfiguration configuration)
    {
        _context = context;
        _logger = logger;
        _configuration = configuration;
    }

    [HttpPost("Login")]
    public async Task<ActionResult<string>> Login(User user)
    {
        _logger.LogInformation("Login endpoint hit");
        _logger.LogInformation($"Attempt to login with Username: {user.Username}");

        var foundUser = await _context.Users
            .SingleOrDefaultAsync(x => x.Username == user.Username && x.Password == user.Password);

        if (foundUser == null)
        {
            _logger.LogInformation("User not found or incorrect password");
            return NotFound();
        }

        var token = GenerateJwtToken(foundUser);

        _logger.LogInformation("User found and authenticated");

        return Ok(token);
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Issuer"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
