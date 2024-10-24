
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Models;

namespace mwm_app.Server.Data.ResponseDTO
{
    public class ShoppingCartResponseDTO
    {
        public string ID { get; set; }

        public BookResponseDTO Book { get; set; }

        public DateTime CreatedAt { get; set; }

        public int Quantity { get; set; }
    }
}
