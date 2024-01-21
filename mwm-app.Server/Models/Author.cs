using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mwm_app.Server.Models
{
    public class Author
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }

        public string FullName { get; set; }

        public string? ImageUrl { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
