using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mwm_app.Server.Models
{
    public class ReturnedItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }
        public Book Book { get; set; }
        public int Quantity { get; set; }
    }

    public class ReturnedUserOrder 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }

        public User User { get; set; }

        public UserOrder Order { get; set; }

        public ICollection<ReturnedItem> ReturnedItems { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}