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
    public class TopBooksController : ControllerBase
    {
        private readonly MainDBContext _context;

        public TopBooksController(MainDBContext context)
        {
            _context = context;
        }

        // GET: api/TopBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopBookResponseDTO>>> GetTopBooks()
        {
            return await _context.TopBooks
                .Include(b => b.Book)
                    .ThenInclude(b => b.Author)
                .Select(b => new TopBookResponseDTO {
                    ID = b.ID,
                    Book = new BookResponseDTO
                    {
                        ID = b.Book.ID,
                        Title = b.Book.Title,
                        Slug = b.Book.Slug,
                        ImageUrl = b.Book.ImageUrl,
                        PreviewUrl = b.Book.PreviewUrl,
                        Category = new BookCategoryDTO
                        {
                            ID = b.Book.Category.ID,
                            Category = b.Book.Category.Category,
                            IsTrending = b.Book.Category.IsTrending,
                        },
                        Author = new AuthorDTO
                        {
                            ID = b.Book.Author.ID,
                            FullName = b.Book.Author.FullName,
                            ImageUrl = b.Book.Author.ImageUrl,
                        },
                        Price = b.Book.Price,
                        Description = b.Book.Description,
                        SKU = b.Book.SKU,
                        PublishedAt = b.Book.PublishedAt,
                        CreatedAt = b.Book.CreatedAt,
                        UpdatedAt = b.Book.UpdatedAt,
                    },
                    Ranking = b.Ranking
                })
                .ToListAsync();
        }

        // GET: api/TopBooks/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Book>> GetTopBook(string id)
        // {
        //     var book = await _context.Books.FindAsync(id);

        //     if (book == null)
        //     {
        //         return NotFound();
        //     }

        //     return book;
        // }

        // PUT: api/TopBooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutTopBook(string id, Book book)
        // {
        //     if (id != book.ID)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(book).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!TopBookExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // POST: api/TopBooks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostTopBook(ICollection<TopBookDTO> topBooksDTO)
        {
            // Remove all current data first
            var currentTopBooks = await _context.TopBooks.ToListAsync();
            _context.TopBooks.RemoveRange(currentTopBooks);
            await _context.SaveChangesAsync();
            
            foreach (TopBookDTO topBookDTO in topBooksDTO)
            {
                var book = await _context.Books.FirstAsync(b => b.ID == topBookDTO.BookID);
                if (book == null) {
                    return BadRequest();
                }
                var topBook = new TopBook
                {
                    Book = book,
                    Ranking = topBookDTO.Ranking,
                };
                _context.TopBooks.Add(topBook);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                
            }

            return Ok();
        }

        // DELETE: api/TopBooks/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteTopBook(string id)
        // {
        //     var book = await _context.Books.FindAsync(id);
        //     if (book == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Books.Remove(book);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        // private bool TopBookExists(string id)
        // {
        //     return _context.Books.Any(e => e.ID == id);
        // }
    }
}
