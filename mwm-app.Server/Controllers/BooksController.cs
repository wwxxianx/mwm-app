using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using mwm_app.Server.Data;
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Data.ResponseDTO;
using mwm_app.Server.Models;
using mwm_app.Server.Utils;

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


        public class BookRequest {
            public int? PageNumber { get; set; }

            public ICollection<string>? CategoryID { get; set; }

            public string? AuthorID { get; set; }

            public string? SearchQuery { get; set; }
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult> GetBooks([FromQuery] BookRequest bookRequest)
        {
            var books = _context.Books
                .Include(b => b.Category)
                .Include(b => b.Author)
                .OrderByDescending(b => b.CreatedAt)
                .AsQueryable();

            if (!string.IsNullOrEmpty(bookRequest.SearchQuery))
            {
                // Split the search query into individual words
                var searchWords = bookRequest.SearchQuery.Split(" ", StringSplitOptions.RemoveEmptyEntries);
                // Filter books that contain any of the search words in the title
                books = books.Where(b => searchWords.Any(word => b.Title.Contains(word)));
                return Ok(await books.Select(b => BookResponseDTO.CreateFromBook(b)).ToListAsync());
            }

            if (bookRequest.PageNumber == null) {
                // Admin side
                // Fetch all the books to the admin table
                return Ok(await books.Select(b => BookResponseDTO.CreateFromBook(b)).ToListAsync());
            }


            if (bookRequest.CategoryID != null) {
                books = books.Where(b => bookRequest.CategoryID.Contains(b.Category.ID));
            }


            int pageSize = 10;
            var paginatedBooks =  await PaginatedList<Book>.CreateAsync(books.AsNoTracking(), bookRequest.PageNumber ?? 1, pageSize);
            return Ok(new PaginatedListResponse<BookResponseDTO>
            {
                Data = paginatedBooks.Select(b => BookResponseDTO.CreateFromBook(b)).ToList(),
                HasNextPage = paginatedBooks.HasNextPage,
                HasPreviousPage = paginatedBooks.HasPreviousPage,
                TotalPages = paginatedBooks.TotalPages,
            });
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
            
            var newBook = BookResponseDTO.CreateFromBook(book);

            return CreatedAtAction("GetBook", new { id = book.ID }, newBook);
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
