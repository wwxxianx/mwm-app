using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mwm_app.Server.Models
{
    public class ShoppingCart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }

        public DateTime CreatedAt { get; set; }

        public User User { get; set; }

        public Book Book { get; set; }

        public int Quantity { get; set; }
    }
}