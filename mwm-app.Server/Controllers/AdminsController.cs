using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mwm_app.Server.Data;
using mwm_app.Server.Models;

namespace mwm_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        public class LoginResponse
        {
            public Admin admin { get; set; }

            public string Token { get; set; }
        }

        private readonly MainDBContext _context;
        private IConfiguration _config;

        public AdminsController(MainDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // POST: api/Admins/login
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(AuthPayload payload)
        {
            var admin = _context.Admins.Where(a => a.Email == payload.Email && a.Password == payload.Password).First();
            if (admin == null)
            {
                return BadRequest();
            }

            var jwtToken = GenerateJWT(admin);

            return Ok(new { admin = admin, token = jwtToken });
        }

        private string GenerateJWT(Admin admin)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Insert userId to JWT
            var claims = new[] {
                new Claim("ID", admin.ID.ToString()),
            };

            var securityToken = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return token;
        }

        // POST: api/Admins/register
        [HttpPost("register")]
        // public async Task<ActionResult<Customer>> RegisterUser(AuthPayload payload)
        // {
        //     // Perform user registration logic, such as validation and saving to the database
        //     var newUser = new Customer();
        //     newUser.Email = payload.Email;
        //     newUser.Password = payload.Password;
        //     newUser.FullName = payload.Email.Split("@").First();
        //     _context.Users.Add(newUser);
        //     await _context.SaveChangesAsync();

        //     // You can customize the response as needed
        //     return CreatedAtAction("GetUser", new { id = newUser.ID }, newUser);
        // }

        // GET: api/Admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmin()
        {
            return await _context.Admins.ToListAsync();
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(string id)
        {
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }

        // PUT: api/Admins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(string id, Admin admin)
        {
            if (id != admin.ID)
            {
                return BadRequest();
            }

            _context.Entry(admin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
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

        // POST: api/Admins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AdminExists(admin.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAdmin", new { id = admin.ID }, admin);
        }

        // DELETE: api/Admins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(string id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminExists(string id)
        {
            return _context.Admins.Any(e => e.ID == id);
        }
    }
}
