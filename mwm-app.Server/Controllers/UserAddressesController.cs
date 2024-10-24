using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mwm_app.Server.Data;
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Models;

namespace mwm_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAddressesController : ControllerBase
    {
        private readonly MainDBContext _context;
        private IConfiguration _config;

        public UserAddressesController(MainDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public class UpdateDefaultAddressRequest
        {
            public string UserAddressID { get; set; }
        }

        public class UserAddressRequest
        {
            public int UserID { get; set; }
        }

        // [HttpGet]
        // public async Task<ActionResult<ICollection<UserAddress>>> GetUserAddress([FromQuery] UserAddressRequest userAddressRequest)
        // {
        //     var userAddresses = await _context.UserAddresses
        //         .Where(a => a.User.ID == userAddressRequest.UserID)
        //         .ToListAsync();
                
        //     return Ok(userAddresses);
        // }

        [HttpGet]
        public async Task<ActionResult<ICollection<UserAddress>>> GetUserAddress()
        {
            var token = AuthorizationHeaderReader.GetBearerToken(HttpContext);
            if (token == null) {
                return Unauthorized();
            }

            var userAddresses = await _context.UserAddresses
                .Where(a => a.User.UserToken == token)
                .ToListAsync();
                
            return Ok(userAddresses);
        }

        [HttpPost]
        public async Task<ActionResult<UserAddress>> Post(UserAddressDTO userAddressDTO)
        {
            var user = await _context.Users.FirstAsync(u => u.ID == userAddressDTO.UserID);
            if (user == null)
            {
                return BadRequest();
            }
            var newAddress = new UserAddress
            {
                User = user,
                StateRegion = userAddressDTO.StateRegion,
                AddressUnit = userAddressDTO.AddressUnit,
                Postcode = userAddressDTO.Postcode,
                ReceiverEmail = userAddressDTO.ReceiverEmail,
                ReceiverName = userAddressDTO.ReceiverName,
                ReceiverPhoneNumber = userAddressDTO.ReceiverPhoneNumber,
                StreetAddress = userAddressDTO.StreetAddress,
                IsDefault = false,
            };
            _context.UserAddresses.Add(newAddress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAddress", new { id = newAddress.ID }, newAddress);
        }

        [HttpPut("default")]
        public async Task<ActionResult> UpdateDefaultAddress(UpdateDefaultAddressRequest updateDefaultAddressRequest)
        {
            var oldDefaultAddress = await _context.UserAddresses.FirstOrDefaultAsync(a => a.IsDefault == true);
            if (oldDefaultAddress != null)
            {
                oldDefaultAddress.IsDefault = false;
            }
            var addressToSetAsDefault = await _context.UserAddresses.FirstAsync(a => a.ID == updateDefaultAddressRequest.UserAddressID);
            addressToSetAsDefault.IsDefault = true;
            await _context.SaveChangesAsync();
            return Ok(addressToSetAsDefault);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUserAddress(string id, UserAddressDTO userAddressDTO)
        {
            var addressToUpdate = await _context.UserAddresses.FirstOrDefaultAsync(a => a.ID == id);
            if (addressToUpdate == null)
            {
                return BadRequest();
            }
            addressToUpdate.AddressUnit = userAddressDTO.AddressUnit;
            addressToUpdate.StateRegion = userAddressDTO.StateRegion;
            addressToUpdate.Postcode = userAddressDTO.Postcode;
            addressToUpdate.ReceiverEmail = userAddressDTO.ReceiverEmail;
            addressToUpdate.ReceiverName = userAddressDTO.ReceiverName;
            addressToUpdate.ReceiverPhoneNumber = userAddressDTO.ReceiverPhoneNumber;
            addressToUpdate.StreetAddress = userAddressDTO.StreetAddress;

            try 
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // TODO: Handle error
            }
            return Ok(addressToUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAddress(string id)
        {
            var userAddress = await _context.UserAddresses.FindAsync(id);
            if (userAddress == null)
            {
                return NotFound();
            }

            _context.UserAddresses.Remove(userAddress);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}