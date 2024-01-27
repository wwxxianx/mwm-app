using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mwm_app.Server.Models
{
    public class BookReview
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }

        public string ReviewTitle { get; set; }

        public string ReviewDescription { get; set; }

        public int Rating { get; set; }

        public User User { get; set; }

        public Book Book { get; set; }

        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
    }
}