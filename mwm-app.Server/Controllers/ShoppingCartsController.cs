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
    public class ShoppingCartsController : ControllerBase
    {
        private readonly MainDBContext _context;

        public ShoppingCartsController(MainDBContext context)
        {
            _context = context;
        }

        // GET: api/Favourites/5
        [HttpGet]
        public async Task<ActionResult<ICollection<ShoppingCartResponseDTO>>> GetShoppingCarts()
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var shoppingCarts = await _context.ShoppingCarts
                .Include(f => f.Book)
                .Where(f => f.User.UserToken == token)
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
                .ToListAsync();

            if (shoppingCarts == null)
            {
                return NotFound();
            }

            return shoppingCarts;
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
        public async Task<ActionResult<ShoppingCartResponseDTO>> PostShoppingCart(ShoppingCartPostDTO cartDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized(new ErrorResponse { errorTitle = "Login to your account", errorMessage = "Please login to your account first" });
            }

            var user = await _context.Users.FirstAsync(u => u.UserToken == token);
            if (user == null) {
                return BadRequest();
            }

            // Cart Item Existed
            var cartItemExisted = await _context.ShoppingCarts.FirstOrDefaultAsync(i => i.User.ID == user.ID && i.Book.ID == cartDTO.BookID);
            if (cartItemExisted != null) {
                return Conflict(new ErrorResponse { errorMessage = "Item already in your shopping cart" });
            }
            
            var book = await _context.Books.FirstAsync(b => b.ID == cartDTO.BookID);
            if (book == null) {
                return BadRequest();
            }

            var cartItem = new ShoppingCart {
                Book = book,
                User = user,
                CreatedAt = DateTime.Now,
                Quantity = 1,
            };
            var newItem = await  _context.ShoppingCarts.AddAsync(cartItem);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException err)
            {
                if (BookExists(book.ID))
                {
                    // return Conflict();
                }
                else
                {
                    throw;
                }
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
                .FirstAsync(i => i.ID == newItem.Entity.ID);
        }

        // DELETE: api/Books/5
        [HttpDelete]
        public async Task<IActionResult> DeleteShoppingCart(ShoppingCartPutDTO cartDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized(new ErrorResponse { errorTitle = "Login to your account", errorMessage = "Please login to your account first" });
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
