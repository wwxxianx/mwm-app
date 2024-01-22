
using mwm_app.Server.Data.DTO;

namespace mwm_app.Server.Data.ResponseDTO
{
    public class BookResponseDTO
    {
        public string ID { get; set; }

        public string Title { get; set; }

        public string Slug { get; set; }

        public string ImageUrl { get; set; }

        public string? PreviewUrl { get; set; }

        public BookCategoryDTO Category { get; set; }

        public AuthorDTO Author { get; set; }

        public double Price { get; set; }

        public string Description { get; set; }

        public int SKU { get; set; }

        public DateTime? PublishedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
