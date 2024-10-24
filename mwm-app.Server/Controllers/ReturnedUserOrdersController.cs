using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public class ReturnedUserOrdersController : ControllerBase
    {
        private readonly MainDBContext _context;

        public ReturnedUserOrdersController(MainDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetReturnedUserOrder()
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var user = await _context.Users.FirstAsync(u => u.UserToken == token);
            if (user == null) {
                return Unauthorized();
            }

            var returnedUserOrders = await _context.ReturnedUserOrders
                .Include(o => o.ReturnedItems)
                    .ThenInclude(i => i.Book)
                .Include(o => o.Order)
                .Where(o => o.User.ID == user.ID)
                .ToListAsync();
            return Ok(returnedUserOrders);
        }

        [HttpPost]
        public async Task<ActionResult> PostReturnedUserOrder(ReturnedUserOrderDTO returnedUserOrderDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var user = await _context.Users.FirstAsync(u => u.UserToken == token);
            if (user == null) {
                return BadRequest();
            }

            var order = await _context.UserOrders.FirstOrDefaultAsync(o => o.ID == returnedUserOrderDTO.OrderID);
            if (order == null)
            {
                return BadRequest();
            }

            ReturnedUserOrder? returnedUserOrder;
            returnedUserOrder = new ReturnedUserOrder
            {
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                User = user,
                Order = order,
                ReturnedItems = new List<ReturnedItem>(),
            };
            
            foreach (var item in returnedUserOrderDTO.Items)
            {
                var book = await _context.Books.FirstOrDefaultAsync(b => b.ID == item.BookID);
                
                if (book != null)
                {
                    var returnItem = new ReturnedItem
                    {
                        Quantity = item.Quantity,
                        Book = book,
                    };

                    returnedUserOrder.ReturnedItems.Add(returnItem);
                }
            }
            _context.ReturnedUserOrders.Add(returnedUserOrder);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }

            return Ok(returnedUserOrder);
        }
    }
}
