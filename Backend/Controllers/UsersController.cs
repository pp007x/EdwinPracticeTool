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
public class UsersController : ControllerBase
{
    private readonly UserContext _context;
    private readonly ILogger<UsersController> _logger;
    private readonly IConfiguration _configuration;

    public UsersController(UserContext context, ILogger<UsersController> logger, IConfiguration configuration)
    {
        _context = context;
        _logger = logger;
        _configuration = configuration;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        if (user.CompanyId != null)
        {
            var company = await _context.Companies.FindAsync(user.CompanyId);
            if (company == null)
            {
                return NotFound(new { message = "Company not found" });
            }
        }
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUsers", new { id = user.Id }, user);
    }

    [HttpGet("Profile")]
    [Authorize]
    public ActionResult<User> GetProfile()
    {
        var usernameClaim = User.Identity.Name;
        var user = _context.Users.FirstOrDefault(u => u.Username == usernameClaim);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }
}
