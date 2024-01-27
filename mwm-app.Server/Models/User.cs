using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mwm_app.Server.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public string UserToken { get; set; }
        
        public string FullName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public string? PhoneNumber { get; set; }

        public string? ProfileImageUrl { get; set; }

        public DateTime? BirthDate { get; set; }

        public string? Gender { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<UserFavouriteBook> FavouriteBooks { get; set; }

        public ICollection<ShoppingCart> CartItems { get; set; }

        public ICollection<BookReview> BookReviews { get; set; }
    }
}
