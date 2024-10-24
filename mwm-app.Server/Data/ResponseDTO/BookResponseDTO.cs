
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Models;

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

        public static BookResponseDTO CreateFromBook(Book book)
        {
            return new BookResponseDTO
            {
                ID = book.ID,
                Title = book.Title,
                Slug = book.Slug,
                ImageUrl = book.ImageUrl,
                PreviewUrl = book.PreviewUrl,
                Category = new BookCategoryDTO
                {
                    ID = book.Category.ID,
                    Category = book.Category.Category,
                    IsTrending = book.Category.IsTrending,
                },
                Author = new AuthorDTO
                {
                    ID = book.Author.ID,
                    FullName = book.Author.FullName,
                    ImageUrl = book.Author.ImageUrl,
                },
                Price = book.Price,
                Description = book.Description,
                SKU = book.SKU,
                PublishedAt = book.PublishedAt,
                CreatedAt = book.CreatedAt,
                UpdatedAt = book.UpdatedAt,
            };
        }
    }
}
