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
using NuGet.Protocol.Plugins;

namespace mwm_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public class LoginResponse
        {
            public User User { get; set; }

            public string Token { get; set; }
        }

        private readonly MainDBContext _context;
        private IConfiguration _config;

        public UsersController(MainDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(AuthPayload payload)
        {
            var user = _context.Users.Where(u => u.Email == payload.Email && u.Password == payload.Password).First();
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(new { user = user, token = user.UserToken });
        }

        [HttpGet("testing")]
        public async Task<ActionResult<string>> Testing()
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            return token;
            var currentUser = HttpContext.User;
            return currentUser.Claims.FirstOrDefault(c => c.Type == "ID").Value;
        }

        private string GenerateJWT(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Insert userId to JWT
            var claims = new[] {
                new Claim("ID", user.ID.ToString()),
            };

            var securityToken = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return token;
        }

        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<ActionResult<LoginResponse>> RegisterUser(AuthPayload payload)
        {
            // Perform user registration logic, such as validation and saving to the database

            var newUser = new User() {
                Email = payload.Email,
                Password = payload.Password,
                FullName = payload.Email.Split("@").First(),
                UserToken = System.Guid.NewGuid().ToString(),
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // You can customize the response as needed
            return CreatedAtAction("GetUser", new { id = newUser.ID }, new { user = newUser, token = newUser.UserToken});
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.ID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.ID == id);
        }
    }
}
