using mwm_app.Server.Models;

namespace mwm_app.Server.Data.DTO
{
    public class ReturnOrderItem {
        public string BookID { get; set; }
        public int Quantity { get; set; }
    }

    public class ReturnedUserOrderDTO
    {
        public string OrderID { get; set; }

        public ICollection<ReturnOrderItem> Items { get; set; }
    }
}