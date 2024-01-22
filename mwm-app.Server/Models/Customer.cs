using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mwm_app.Server.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public string? PhoneNumber { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<Favourite> FavouriteBooks { get; set; }
    }
}
