namespace mwm_app.Server.Models
{

    public class OrderItem {
        public Book Book { get; set; }
        public int Quantity { get; set; }
    }

    public class UserOrder 
    {
        public string ID { get; set; }

        public UserOrderStatus Status { get; set; }

        public User User { get; set; }

        public string ReceiverName { get; set; }

        public string ReceiverPhoneNumber { get; set; }

        public string? ReceiverEmail { get; set; }

        public string StateRegion { get; set; }

        public string Postcode { get; set; }

        public string StreetAddress { get; set; }

        public string? AddressUnit { get; set; }

        public ICollection<OrderItem> Items { get; set; }

        public double Price { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

    }
}