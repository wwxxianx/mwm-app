using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mwm_app.Server.Data;
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Data.ResponseDTO;
using mwm_app.Server.Models;

namespace mwm_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly MainDBContext _context;

        public BooksController(MainDBContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookResponseDTO>>> GetBooks()
        {
            return await _context.Books
                .Include(b => b.Category)
                .Include(b => b.Author)
                .Select(b => BookResponseDTO.CreateFromBook(b))
                .ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookResponseDTO>> GetBook(string id)
        {
            var book = await _context.Books
                .Include(b => b.Category)
                .Include(b => b.Author)
                .FirstOrDefaultAsync(b => b.ID == id);

            if (book == null)
            {
                return NotFound();
            }

            return BookResponseDTO.CreateFromBook(book);
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(string id, Book book)
        {
            if (id != book.ID)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(BookDTO bookDTO)
        {
            var category = await _context.BookCategories.FirstAsync(category => category.ID == bookDTO.CategoryId);
            if (category == null)
            {
                return BadRequest();
            }

            var author = await _context.Authors.FirstAsync(author => author.ID == bookDTO.AuthorId);
            if (author == null)
            {
                return BadRequest();
            }

            var book = new Book
            {
                Title = bookDTO.Title,
                Slug = bookDTO.Slug,
                Author = author,
                Category = category,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Description = bookDTO.Description,
                ImageUrl = bookDTO.ImageUrl,
                PreviewUrl = bookDTO.PreviewUrl,
                Price = bookDTO.Price,
                PublishedAt = bookDTO.PublishedAt,
                SKU = bookDTO.SKU,
            };
            _context.Books.Add(book);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookExists(book.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            
            var books = await _context.Books
                .Include(b => b.Category)
                .Include(b => b.Author)
                .Select(b => BookResponseDTO.CreateFromBook(b))
                .ToListAsync();

            return CreatedAtAction("GetBook", new { id = book.ID }, books);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(string id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(string id)
        {
            return _context.Books.Any(e => e.ID == id);
        }
    }
}
