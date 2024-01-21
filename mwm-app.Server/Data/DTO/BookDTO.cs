using mwm_app.Server.Models;

namespace mwm_app.Server.Data.DTO
{
    public class BookDTO
    {
        public string Title { get; set; }

        public string Slug { get; set; }

        public string ImageUrl { get; set; }

        public string? PreviewUrl { get; set; }

        public string CategoryId { get; set; }

        public string AuthorId { get; set; }

        public double Price { get; set; }

        public string Description { get; set; }

        public int SKU { get; set; }

        public DateTime? PublishedAt { get; set; }
    }
}
