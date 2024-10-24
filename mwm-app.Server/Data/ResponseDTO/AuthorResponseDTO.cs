
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Models;

namespace mwm_app.Server.Data.ResponseDTO
{
    public class AuthorResponseDTO
    {
        public string ID { get; set; }

        public string FullName { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<BookResponseDTO> Books { get; set; }
    }
}
