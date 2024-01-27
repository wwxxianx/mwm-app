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
    public class BookReviewsController : ControllerBase
    {
        private readonly MainDBContext _context;

        public BookReviewsController(MainDBContext context)
        {
            _context = context;
        }

        public class BookReviewRequest
        {
            public string? BookID { get; set; }
        }

        // GET: api/Favourites/5
        [HttpGet]
        public async Task<ActionResult> GetBookReview([FromQuery] BookReviewRequest bookReviewRequest)
        {
            var bookReviews = await _context.BookReviews
                .Include(r => r.User)
                .Where(r => r.Book.ID == bookReviewRequest.BookID)
                .ToListAsync();

            return Ok(bookReviews);
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("increment")]
        public async Task<ActionResult<ShoppingCartResponseDTO>> PutShoppingCartIncrement(ShoppingCartPutDTO cartDTO)
        {
            var cartItemToUpdate = await _context.ShoppingCarts.FirstAsync(i => i.ID == cartDTO.ShoppingCartID);

            if (cartItemToUpdate == null) {
                return BadRequest();
            }
            cartItemToUpdate.Quantity += 1;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return await _context.ShoppingCarts
                .Include(i => i.Book)
                .Select(f => new ShoppingCartResponseDTO{
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
                    Quantity = f.Quantity,
                })
                .FirstAsync(i => i.ID == cartDTO.ShoppingCartID);
        }

        [HttpPut("decrement")]
        public async Task<ActionResult<ShoppingCartResponseDTO>> PutShoppingCartDecrement(ShoppingCartPutDTO cartDTO)
        {
            var cartItemToUpdate = await _context.ShoppingCarts.FirstAsync(i => i.ID == cartDTO.ShoppingCartID);

            if (cartItemToUpdate == null) {
                return BadRequest();
            }
            cartItemToUpdate.Quantity -= 1;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return await _context.ShoppingCarts
                .Include(i => i.Book)
                .Select(f => new ShoppingCartResponseDTO{
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
                    Quantity = f.Quantity,
                })
                .FirstAsync(i => i.ID == cartDTO.ShoppingCartID);
        }

        // POST: api/Favourites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostBookReview(BookReviewDTO bookReviewDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var user = await _context.Users.FirstAsync(u => u.UserToken == token);
            if (user == null) {
                return BadRequest();
            }
            
            var book = await _context.Books.FirstAsync(b => b.ID == bookReviewDTO.BookID);
            if (book == null) {
                return BadRequest();
            }

            var bookReview = new BookReview {
                Book = book,
                User = user,
                CreatedAt = DateTime.Now,
                Rating = bookReviewDTO.Rating,
                ReviewDescription = bookReviewDTO.ReviewDescription,
                ReviewTitle = bookReviewDTO.ReviewTitle,
                UpdatedAt = DateTime.Now,
            };
            var newReview = await _context.BookReviews.AddAsync(bookReview);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException err)
            {
                return BadRequest();
            }
            
            return Ok(await _context.BookReviews.Include(r => r.User).FirstAsync(r => r.ID == newReview.Entity.ID));
        }

        // DELETE: api/Books/5
        [HttpDelete]
        public async Task<IActionResult> DeleteShoppingCart(ShoppingCartPutDTO cartDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var cartItemToDelete = await _context.ShoppingCarts.FirstAsync(i => i.ID == cartDTO.ShoppingCartID);
            if (cartItemToDelete == null) {
                return BadRequest();
            }
            _context.ShoppingCarts.Remove(cartItemToDelete);

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateException) {
                return BadRequest();
            }
            return StatusCode(204);
        }

        private bool BookExists(string id)
        {
            return _context.Books.Any(e => e.ID == id);
        }
    }
}
