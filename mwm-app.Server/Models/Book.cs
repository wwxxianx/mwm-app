using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mwm_app.Server.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }

        public string Title { get; set; }

        public string Slug { get; set; }

        public string ImageUrl { get; set; }

        public string? PreviewUrl { get; set; }

        //Category
        public BookCategory Category { get; set; }

        //Author
        public Author Author { get; set; }

        public double Price { get; set; }

        public string Description { get; set; }

        public int SKU { get; set; }

        public DateTime? PublishedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
