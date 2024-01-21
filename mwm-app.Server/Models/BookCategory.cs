using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mwm_app.Server.Models
{
    public class BookCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }

        public string Category { get; set; }

        public bool IsTrending { get; set; }

        public ICollection<Book> Books { get; set; }

    }
}
