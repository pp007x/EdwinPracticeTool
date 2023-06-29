// CompaniesController.cs
using LoginApi.Data;
using LoginApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly ILogger<CompaniesController> _logger;
        private readonly IConfiguration _configuration;

        public CompaniesController(UserContext context, ILogger<CompaniesController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Company>> PostCompany([FromBody] Company company)
        {
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

        [HttpGet("{companyId}/users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersForCompany(int companyId)
        {
            var users = await _context.Users.Where(u => u.CompanyId == companyId).ToListAsync();

            if (users.Count == 0)
            {
                return NotFound();
            }
            Console.WriteLine(users[0].Box);
            
            return users;
        }
    }
}
