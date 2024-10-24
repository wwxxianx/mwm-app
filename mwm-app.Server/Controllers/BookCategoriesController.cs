using System;
using System.Collections.Generic;
using System.Data.Common;
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
    public class BookCategoriesController : ControllerBase
    {
        private readonly MainDBContext _context;

        public BookCategoriesController(MainDBContext context)
        {
            _context = context;
        }

        // GET: api/BookCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookCategory>>> GetBookCategory()
        {
            return await _context.BookCategories.ToListAsync();
        }

        [HttpGet("trending")]
        public async Task<ActionResult<IEnumerable<BookCategory>>> GetTrendingBookCategory()
        {
            try
            {
                return await _context.BookCategories.Where(c => c.IsTrending).ToListAsync();
            }
            catch (DbException)
            {
                return BadRequest();
            }
        }

        // GET: api/BookCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookCategory>> GetBookCategory(string id)
        {
            var bookCategory = await _context.BookCategories.FindAsync(id);

            if (bookCategory == null)
            {
                return NotFound();
            }

            return bookCategory;
        }

        // PUT: api/BookCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<ICollection<BookCategory>>> PutBookCategory(string id, BookCategoryDTO bookCategoryDTO)
        {
            if (id != bookCategoryDTO.ID)
            {
                return BadRequest();
            }
            var bookCategoryToUpdate = await _context.BookCategories.FirstOrDefaultAsync(c => c.ID == id);
            if (bookCategoryToUpdate == null)
            {
                return NotFound();
            }
            bookCategoryToUpdate.Category = bookCategoryDTO.Category;
            bookCategoryToUpdate.IsTrending = bookCategoryDTO.IsTrending;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return await _context.BookCategories.ToListAsync();
        }

        // POST: api/BookCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ICollection<BookCategory>>> PostBookCategory(BookCategoryDTO bookCategoryDTO)
        {
            var bookCategory = new BookCategory
            {
                Category = bookCategoryDTO.Category,
                IsTrending = bookCategoryDTO.IsTrending,
            };
            _context.BookCategories.Add(bookCategory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookCategoryExists(bookCategory.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            var bookCategories = await _context.BookCategories.ToListAsync();
            return CreatedAtAction("GetBookCategory", new { id = bookCategory.ID }, bookCategories);
        }

        // DELETE: api/BookCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBookCategory(string id)
        {
            var bookCategory = await _context.BookCategories.FindAsync(id);
            if (bookCategory == null)
            {
                return NotFound();
            }

            _context.BookCategories.Remove(bookCategory);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }
        }

        private bool BookCategoryExists(string id)
        {
            return _context.BookCategories.Any(e => e.ID == id);
        }
    }
}
