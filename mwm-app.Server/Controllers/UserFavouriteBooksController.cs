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
    public class UserFavouriteBooksController : ControllerBase
    {
        private readonly MainDBContext _context;

        public UserFavouriteBooksController(MainDBContext context)
        {
            _context = context;
        }

        // GET: api/Books
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<BookResponseDTO>>> GetBooks()
        // {
        //     return await _context.Books
        //         .Include(b => b.Category)
        //         .Include(b => b.Author)
        //         .Select(b => BookResponseDTO.CreateFromBook(b))
        //         .ToListAsync();
        // }

        // GET: api/Favourites/5
        [HttpGet]
        public async Task<ActionResult<ICollection<UserFavouriteBookResponseDTO>>> GetFavourites()
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var favourites = await _context.UserFavouriteBooks
                .Include(f => f.Book)
                .Where(f => f.User.UserToken == token)
                .Select(f => new UserFavouriteBookResponseDTO{
                    Book = new BookResponseDTO
                    {
                        ID = f.Book.ID,
                        Title = f.Book.Title,
                        Slug = f.Book.Slug,
                        ImageUrl = f.Book.ImageUrl,
                        PreviewUrl = f.Book.PreviewUrl,
                        Category = new BookCategoryDTO
                        {
                            ID = f.Book.Category.ID,
                            Category = f.Book.Category.Category,
                            IsTrending = f.Book.Category.IsTrending,
                        },
                        Author = new AuthorDTO
                        {
                            ID = f.Book.Author.ID,
                            FullName = f.Book.Author.FullName,
                            ImageUrl = f.Book.Author.ImageUrl,
                        },
                        Price = f.Book.Price,
                        Description = f.Book.Description,
                        SKU = f.Book.SKU,
                        PublishedAt = f.Book.PublishedAt,
                        CreatedAt = f.Book.CreatedAt,
                        UpdatedAt = f.Book.UpdatedAt,
                    },
                    CreatedAt = f.CreatedAt,
                    ID = f.ID,
                })
                .ToListAsync();

            if (favourites == null)
            {
                return NotFound();
            }

            return favourites;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutBook(string id, Book book)
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
        //         if (!BookExists(id))
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

        // POST: api/Favourites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ICollection<UserFavouriteBookResponseDTO>>> PostFavourite(UserFavouriteBookDTO favouriteDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var book = await _context.Books.FirstAsync(b => b.ID == favouriteDTO.BookID);
            if (book == null) {
                return BadRequest();
            }
            var user = await _context.Users.FirstAsync(u => u.UserToken == token);
            if (user == null) {
                return BadRequest();
            }
            var favourite = new UserFavouriteBook
            {
                Book = book,
                User = user,
                CreatedAt = DateTime.Now,
            };
            _context.UserFavouriteBooks.Add(favourite);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException err)
            {
                Console.WriteLine(err.Message);
                Console.WriteLine("Something went wrong here");
                if (BookExists(book.ID))
                {
                    // return Conflict();
                }
                else
                {
                    throw;
                }
            }
            
            var favourites = await _context.UserFavouriteBooks
                .Include(f => f.Book)
                .Where(f => f.User.UserToken == token)
                .Select(f => new UserFavouriteBookResponseDTO{
                    Book = new BookResponseDTO
                    {
                        ID = f.Book.ID,
                        Title = f.Book.Title,
                        Slug = f.Book.Slug,
                        ImageUrl = f.Book.ImageUrl,
                        PreviewUrl = f.Book.PreviewUrl,
                        Category = new BookCategoryDTO
                        {
                            ID = f.Book.Category.ID,
                            Category = f.Book.Category.Category,
                            IsTrending = f.Book.Category.IsTrending,
                        },
                        Author = new AuthorDTO
                        {
                            ID = f.Book.Author.ID,
                            FullName = f.Book.Author.FullName,
                            ImageUrl = f.Book.Author.ImageUrl,
                        },
                        Price = f.Book.Price,
                        Description = f.Book.Description,
                        SKU = f.Book.SKU,
                        PublishedAt = f.Book.PublishedAt,
                        CreatedAt = f.Book.CreatedAt,
                        UpdatedAt = f.Book.UpdatedAt,
                    },
                    CreatedAt = f.CreatedAt,
                    ID = f.ID,
                })
                .ToListAsync();

            return favourites;
        }

        // DELETE: api/Books/5
        [HttpDelete]
        public async Task<ActionResult<ICollection<UserFavouriteBookResponseDTO>>> DeleteBook(UserFavouriteBookDTO favouriteDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }
            var favourites = await _context.UserFavouriteBooks.Where(f => f.Book.ID == favouriteDTO.BookID && f.User.UserToken == token).ToListAsync();
            _context.UserFavouriteBooks.RemoveRange(favourites);
            await _context.SaveChangesAsync();

            return await _context.UserFavouriteBooks
                .Include(f => f.Book)
                .Where(f => f.User.UserToken == token)
                .Select(f => new UserFavouriteBookResponseDTO{
                    Book = new BookResponseDTO
                    {
                        ID = f.Book.ID,
                        Title = f.Book.Title,
                        Slug = f.Book.Slug,
                        ImageUrl = f.Book.ImageUrl,
                        PreviewUrl = f.Book.PreviewUrl,
                        Category = new BookCategoryDTO
                        {
                            ID = f.Book.Category.ID,
                            Category = f.Book.Category.Category,
                            IsTrending = f.Book.Category.IsTrending,
                        },
                        Author = new AuthorDTO
                        {
                            ID = f.Book.Author.ID,
                            FullName = f.Book.Author.FullName,
                            ImageUrl = f.Book.Author.ImageUrl,
                        },
                        Price = f.Book.Price,
                        Description = f.Book.Description,
                        SKU = f.Book.SKU,
                        PublishedAt = f.Book.PublishedAt,
                        CreatedAt = f.Book.CreatedAt,
                        UpdatedAt = f.Book.UpdatedAt,
                    },
                    CreatedAt = f.CreatedAt,
                    ID = f.ID,
                })
                .ToListAsync();
        }

        private bool BookExists(string id)
        {
            return _context.Books.Any(e => e.ID == id);
        }
    }
}
