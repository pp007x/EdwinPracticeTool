// CompaniesController.cs
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
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class CompaniesController : ControllerBase
{
    private readonly UserContext _context;
    private readonly ILogger<CompaniesController> _logger;
    private readonly IConfiguration _configuration;

    public CompaniesController(UserContext context, ILogger<CompaniesController> _logger, IConfiguration _configuration)
    {
        _context = context;
        _logger = _logger;
        _configuration = _configuration;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Company>> PostCompany([FromForm]Company company, IFormFile logo)
    {
        if (logo != null)
        {
            using (var memoryStream = new MemoryStream())
            {
                await logo.CopyToAsync(memoryStream);
                company.Logo = memoryStream.ToArray();
            }
        }
        
        _context.Companies.Add(company);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Company>> GetCompany(int id)
    {
        var company = await _context.Companies.FindAsync(id);

        if (company == null)
        {
            return NotFound();
        }

        return company;
    }
}
