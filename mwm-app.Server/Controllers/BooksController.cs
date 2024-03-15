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

        public class RelevantBookRequest
        {
            public int? Limit { get; set; }

            public string? CategoryID { get; set; }
        }

        [HttpGet("testing")]
        public async Task<ActionResult> GetBookTesting()
        {
            var books = await _context.Books
                .Include(b => b.Category)
                .Include(b => b.Author)
                .ToListAsync();

            return Ok(books);
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

        [HttpGet("relevant")]
        public async Task<ActionResult> GetRelevantBook([FromQuery] RelevantBookRequest bookRequest)
        {
            var books = await _context.Books
                .Include(b => b.Category)
                .Include(b => b.Author)
                .Where(b => b.Category.ID == bookRequest.CategoryID)
                .Take(bookRequest.Limit ?? 10)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
            
            if (books.Count < bookRequest.Limit)
            {
                var otherBooks = await _context.Books
                .Include(b => b.Category)
                .Include(b => b.Author)
                .Take((bookRequest.Limit ?? 10) - books.Count)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
                books.AddRange(otherBooks);
            }

            return Ok(books);
        }

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

        [HttpGet("trendingCategoryBook")]
        public async Task<ActionResult<ICollection<BookResponseDTO>>> GetTrendingCategoryBook()
        {
            try
            {
                // List of hardcoded trending categories
                List<string> trendingCategories = new List<string> { "Fiction", "Horror", "Novel", "Technology", "History", "Economics" };

                // Collection to store the result
                List<BookResponseDTO> trendingBooks = new List<BookResponseDTO>();

                foreach (var category in trendingCategories)
                {
                    // Retrieve the top 3 books for each category (you need to customize this logic)
                    var topBooksForCategory = await _context.Books
                        .Include(b => b.Category)
                        .Include(b => b.Author)
                        .Where(b => b.Category.Category.Equals(category))
                        .Take(3)
                        .ToListAsync();

                    // Convert the retrieved books to BookResponseDTO and add to the result collection
                    trendingBooks.AddRange(topBooksForCategory.Select(BookResponseDTO.CreateFromBook));
                }

                return trendingBooks;
            }
            catch (Exception ex)
            {
                // Handle exceptions and return an error response
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("featuredBooks")]
        public async Task<ActionResult<ICollection<BookResponseDTO>>> GetFeaturedBooks()
        {
            try
            {
                // List of hardcoded trending categories
                List<string> trendingCategories = new List<string> { "Fiction", "Technology", "History" };

                // Collection to store the result
                List<BookResponseDTO> trendingBooks = new List<BookResponseDTO>();

                foreach (var category in trendingCategories)
                {
                    // Retrieve the top 3 books for each category (you need to customize this logic)
                    var topBooksForCategory = await _context.Books
                        .Include(b => b.Category)
                        .Include(b => b.Author)
                        .Where(b => b.Category.Category.Equals(category))
                        .Take(3)
                        .ToListAsync();

                    // Convert the retrieved books to BookResponseDTO and add to the result collection
                    trendingBooks.AddRange(topBooksForCategory.Select(BookResponseDTO.CreateFromBook));
                }

                return trendingBooks;
            }
            catch (Exception ex)
            {
                // Handle exceptions and return an error response
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        public class AuthorBookRequest {
            public string AuthorID { get; set; }
        }

        [HttpGet("Author")]
        public async Task<ActionResult<ICollection<BookResponseDTO>>> GetAuthorBooks([FromQuery] AuthorBookRequest authorBookRequest)
        {
                List<BookResponseDTO> authorBooks = new List<BookResponseDTO>();
                var books = await _context.Books
                    .Include(b => b.Category)
                    .Include(b => b.Author)
                    .Where(b => b.Author.ID == authorBookRequest.AuthorID).ToListAsync();
                    
                authorBooks.AddRange(books.Select(BookResponseDTO.CreateFromBook));
                return authorBooks;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<BookResponseDTO>> PutBook(string id, BookDTO bookDTO)
        {
            var transformedSlug = bookDTO.Slug.ToLower();
            var slugExist = await _context.Books.FirstOrDefaultAsync(b => b.ID != id && b.Slug.Equals(transformedSlug));
            if (slugExist != null)
            {
                return StatusCode(409, new ErrorResponse { errorMessage = "Slug already exist, pls use another slug" });
            }
            if (id != bookDTO.ID)
            {
                return BadRequest();
            }
            var bookToUpdate = await _context.Books.FirstAsync(b => b.ID == id);

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

            bookToUpdate.SKU = bookDTO.SKU;
            bookToUpdate.Category = category;
            bookToUpdate.Author = author;
            bookToUpdate.UpdatedAt = DateTime.Now;
            bookToUpdate.Description = bookDTO.Description;
            bookToUpdate.ImageUrl = bookDTO.ImageUrl;
            bookToUpdate.PreviewUrl = bookDTO.PreviewUrl;
            bookToUpdate.Slug = bookDTO.Slug;
            bookToUpdate.Price = bookDTO.Price;

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

            return BookResponseDTO.CreateFromBook(bookToUpdate);
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(BookDTO bookDTO)
        {
            var transformedSlug = bookDTO.Slug.ToLower();
            var slugExist = await _context.Books.FirstOrDefaultAsync(b => b.Slug.Equals(transformedSlug));
            if (slugExist != null)
            {
                return StatusCode(409, new ErrorResponse { errorMessage = "Slug already exist, pls use another slug" });
            }
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
        [HttpDelete("{bookID}")]
        public async Task<IActionResult> DeleteBook(string bookID)
        {
            var book = await _context.Books.FindAsync(bookID);
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
