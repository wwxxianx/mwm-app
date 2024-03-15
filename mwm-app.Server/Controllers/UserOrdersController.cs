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
    public class UserOrdersController : ControllerBase
    {
        private readonly MainDBContext _context;

        public UserOrdersController(MainDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetUserOrder() {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserToken == token);
            if (user == null)
            {    
                return BadRequest();
            } 
            var userOrders = await _context.UserOrders
                    .Include(order => order.User)
                    .Include(order => order.Items)
                        .ThenInclude(item => item.Book)
                    .Where(order => order.User.ID == user.ID)
                    .ToListAsync();
                return Ok(userOrders);
        }

        [HttpGet("{orderID}")]
        public async Task<ActionResult> GetUserOrderByID(string orderID) {
            var userOrder = await _context.UserOrders
                    .Include(order => order.User)
                    .Include(order => order.Items)
                        .ThenInclude(item => item.Book)
                    .FirstAsync(order => order.ID == orderID);

            return Ok(userOrder);
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetAllUserOrder() {
            var userOrders = await _context.UserOrders
                    .Include(order => order.User)
                    .Include(order => order.Items)
                        .ThenInclude(item => item.Book)
                    .ToListAsync();
                return Ok(userOrders);
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{orderID}")]
        public async Task<ActionResult<UserOrder>> PutShoppingCartIncrement(string orderID, UpdateUserOrderDTO userOrderDTO)
        {
            var orderToUpdate = await _context.UserOrders.
                Include(order => order.User)
                .Include(order => order.Items)
                    .ThenInclude(item => item.Book)
                .FirstAsync(order => order.ID == orderID);
                
            if (orderToUpdate == null)
            {
                return BadRequest();
            }

            orderToUpdate.Postcode = userOrderDTO.Postcode;
            orderToUpdate.Status = userOrderDTO.Status;
            orderToUpdate.ReceiverPhoneNumber = userOrderDTO.ReceiverPhoneNumber;
            orderToUpdate.AddressUnit = userOrderDTO.AddressUnit;
            orderToUpdate.StreetAddress = userOrderDTO.StreetAddress;
            orderToUpdate.ReceiverEmail = userOrderDTO.ReceiverEmail;
            orderToUpdate.ReceiverName = userOrderDTO.ReceiverName;
            orderToUpdate.StateRegion = userOrderDTO.StateRegion;
            orderToUpdate.UpdatedAt = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return Ok(orderToUpdate);
        }

        // POST: api/Favourites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostUserOrder(UserOrderDTO userOrderDTO)
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var user = await _context.Users.FirstAsync(u => u.UserToken == token);
            if (user == null) {
                return BadRequest();
            }

            UserOrder? order;
            order = new UserOrder
            {
                AddressUnit = userOrderDTO.AddressUnit,
                CreatedAt = DateTime.Now,
                Postcode = userOrderDTO.Postcode,
                Price = userOrderDTO.Price,
                ReceiverEmail = userOrderDTO.ReceiverEmail,
                ReceiverName = userOrderDTO.ReceiverName,
                ReceiverPhoneNumber = userOrderDTO.ReceiverPhoneNumber,
                StateRegion = userOrderDTO.StateRegion,
                Status = UserOrderStatus.Pending.ToString(),
                StreetAddress = userOrderDTO.StreetAddress,
                UpdatedAt = DateTime.Now,
                User = user,
                Items = new List<OrderItem>(),
            };
            
            foreach (var item in userOrderDTO.Items)
            {
                var book = await _context.Books.FirstOrDefaultAsync(b => b.ID == item.BookID);
                
                if (book != null)
                {
                    var orderItem = new OrderItem
                    {
                        Quantity = item.Quantity,
                        Book = book,
                    };

                    order.Items.Add(orderItem);
                }
            }
            _context.UserOrders.Add(order);
                
            var cartIds = userOrderDTO.Items.Select(orderItem => orderItem.CartID).ToList();
            var cartItemsToRemove = await _context.ShoppingCarts
                .Where(cart => cartIds.Contains(cart.ID))
                .ToListAsync();
            // Removing fetched cart items
            _context.ShoppingCarts.RemoveRange(cartItemsToRemove);

            // Check for new address
            var userCurrentAddresses = await _context.UserAddresses.Where(a => a.User.ID == user.ID).ToListAsync();
            if (userCurrentAddresses.Count == 0 || userCurrentAddresses == null)
            {
                // Add new address
                var newAddress = new UserAddress
                {
                    User = user,
                    StateRegion = userOrderDTO.StateRegion,
                    AddressUnit = userOrderDTO.AddressUnit,
                    Postcode = userOrderDTO.Postcode,
                    ReceiverEmail = userOrderDTO.ReceiverEmail,
                    ReceiverName = userOrderDTO.ReceiverName,
                    ReceiverPhoneNumber = userOrderDTO.ReceiverPhoneNumber,
                    StreetAddress = userOrderDTO.StreetAddress,
                    IsDefault = true,
                };
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }

            return Ok(order);
        }

        // DELETE: api/Books/5
        [HttpDelete("{orderID}")]
        public async Task<IActionResult> DeleteUserOrder(string orderID)
        {
            var orderToDelete = await _context.UserOrders.FindAsync(orderID);
            if (orderToDelete == null) {
                return BadRequest();
            }
            _context.UserOrders.Remove(orderToDelete);

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateException) {
                return BadRequest();
            }
            return StatusCode(204);
        }
    }
}
