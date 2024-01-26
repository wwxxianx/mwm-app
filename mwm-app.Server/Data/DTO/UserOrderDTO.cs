using mwm_app.Server.Models;

namespace mwm_app.Server.Data.DTO
{
    public class OrderItemDTO {
        public string CartID { get; set; }
        public string BookID { get; set; }
        public int Quantity { get; set; }
    }

    public class UserOrderDTO
    {
        public double Price { get; set; }
        
        public string ReceiverName { get; set; }

        public string ReceiverPhoneNumber { get; set; }

        public string? ReceiverEmail { get; set; }

        public string StateRegion { get; set; }

        public string Postcode { get; set; }

        public string StreetAddress { get; set; }

        public string? AddressUnit { get; set; }

        public ICollection<OrderItemDTO> Items { get; set; }
    }
}