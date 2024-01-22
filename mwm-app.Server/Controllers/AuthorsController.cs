using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mwm_app.Server.Data;
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Models;

namespace mwm_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly MainDBContext _context;

        public AuthorsController(MainDBContext context)
        {
            _context = context;
        }

        // GET: api/Authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
        {
            return await _context.Authors.ToListAsync();
        }

        // GET: api/Authors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(string id)
        {
            var author = await _context.Authors.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }

        // PUT: api/Authors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<ICollection<Author>>> PutAuthor(string id, AuthorDTO authorDTO)
        {
            if (id != authorDTO.ID)
            {
                return BadRequest();
            }

            var authorToUpdate = await _context.Authors.FirstOrDefaultAsync(a => a.ID == id);
            authorToUpdate.FullName = authorDTO.FullName;
            authorToUpdate.ImageUrl = authorToUpdate.ImageUrl;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var authors = await _context.Authors.ToListAsync();

            return authors;
        }

        // POST: api/Authors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ICollection<Author>>> PostAuthor(AuthorDTO authorDTO)
        {
            var author = new Author
            {
                FullName = authorDTO.FullName,
                ImageUrl = authorDTO.ImageUrl,
            };
            _context.Authors.Add(author);
            await _context.SaveChangesAsync();
            var authors = await _context.Authors.ToListAsync();

            return CreatedAtAction("GetAuthor", new { id = author.ID }, authors);
        }

        // DELETE: api/Authors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ICollection<Author>>> DeleteAuthor(string id)
        {
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();
            var authors = await _context.Authors.ToListAsync();

            return authors;
        }

        private bool AuthorExists(string id)
        {
            return _context.Authors.Any(e => e.ID == id);
        }
    }
}
